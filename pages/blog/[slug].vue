<script setup>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const route = useRoute()
const router = useRouter()
const { $contentful } = useNuxtApp()
const lang = useLang()

const article = ref(null)
const error = ref(null)

// Chargement de l'article selon le slug et la langue
const loadArticle = async (slug, locale) => {
  try {
    const response = await $contentful.getEntries({
      content_type: 'article',
      'fields.slug': slug,
      locale,
      limit: 1,
      include: 1
    })

    return response.items[0] || null

  } catch (err) {
    console.error('Erreur chargement article:', err)
    throw err
  }
}

// Chargement initial
const { data, error: fetchError } = await useAsyncData(
  `article-${route.params.slug}-${lang.value}`,
  () => loadArticle(route.params.slug, lang.value)
)

article.value = data.value
error.value = fetchError.value

// Article introuvable
if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article introuvable'
  })
}

// Contenu Rich Text
const articleHtml = computed(() => {
  const content = article.value?.fields?.content

  if (!content) return ''

  return documentToHtmlString(content)
})

// Changement de langue
watch(lang, async (newLang) => {
  if (!article.value) return

  try {
    // On récupère la traduction du même article
    const translatedArticle = await $contentful.getEntry(
      article.value.sys.id,
      { locale: newLang }
    )

    article.value = translatedArticle

    // On met à jour le slug dans l'URL
    const newSlug = translatedArticle.fields.slug

    if (newSlug !== route.params.slug) {
      await router.replace(`/blog/${newSlug}`)
    }

  } catch (err) {
    console.error('Erreur changement de langue:', err)
  }
})

// SEO dynamique
useHead(() => {
  const fields = article.value?.fields

  if (!fields) return {}

  const title = `${fields.title} | ODicé`
  const description = fields.excerpt || ''
  const image = fields.coverImage?.fields?.file?.url
    ? `https:${fields.coverImage.fields.file.url}`
    : 'https://www.odice-immigration.com/flags.jpg'

  const url = `https://www.odice-immigration.com/blog/${fields.slug}`

  return {
    title,

    link: [
      {
        rel: 'canonical',
        href: url
      }
    ],

    meta: [
      { name: 'description', content: description },

      // Open Graph
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ]
  }
})
</script>

<template>
  <main v-if="article" class="mt-16 mb-5">

    <!-- Head -->
    <section class="px-5 pb-12 pt-12">
      <div class="mx-auto max-w-4xl">

        <NuxtLink
          to="/#blog"
          class="mb-8 inline-flex items-center gap-2 text-sm text-gray-500
                 transition hover:text-[#483b3b]"
        >
          ← Retour aux articles
        </NuxtLink>

        <!-- Date -->
        <p
          v-if="article.fields.publishedAt"
          class="mb-4 text-sm text-gray-400"
        >
          {{
            new Date(article.fields.publishedAt).toLocaleDateString(
              'fr-FR',
              {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }
            )
          }}
        </p>

        <!-- Titre -->
        <h1
          class="text-4xl font-normal leading-tight text-[#483b3b]
                 md:text-5xl"
        >
          {{ article.fields.title }}
        </h1>

        <!-- Excerpt -->
        <p
          v-if="article.fields.excerpt"
          class="mt-6 text-lg leading-relaxed text-gray-600"
        >
          {{ article.fields.excerpt }}
        </p>

      </div>
    </section>

    <!-- Image -->
    <section
      v-if="article.fields.coverImage"
      class="px-5"
    >
      <div class="mx-auto max-w-5xl overflow-hidden rounded-2xl">
        <img
          :src="`https:${article.fields.coverImage.fields.file.url}`"
          :alt="
            article.fields.coverImage.fields.title ||
            article.fields.title
          "
          class="h-70 w-full object-cover"
        >
      </div>
    </section>

    <!-- Article -->
    <section class="px-7 py-16">
      <article
        class="prose prose-lg mx-auto max-w-3xl
               prose-headings:text-[#483b3b]
               prose-p:text-gray-700
               prose-a:text-[#8a6f6f]"
      >
        <!-- Contenu Contentful -->
        <div
          class="article-content whitespace-pre-line"
          v-html="articleHtml"
        ></div>
      </article>
    </section>

  </main>
</template>