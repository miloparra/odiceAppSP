<script setup>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
const route = useRoute()
const { $contentful } = useNuxtApp()

const { data: article, error } = await useAsyncData(
  `article-${route.params.slug}`,
  async () => {
    const response = await $contentful.getEntries({
      content_type: 'article',
      'fields.slug': route.params.slug,
      limit: 1
    })

    return response.items[0] || null
  }
)

const articleHtml = computed(() => {
  const content = article.value?.fields?.content

  if (!content) return ''

  return documentToHtmlString(content)
})

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article introuvable'
  })
}

useHead({
  title: `${article.value.fields.title} | ODicé`,
  meta: [
    {
      name: 'description',
      content: article.value.fields.excerpt
    }
  ]
})
</script>

<template>
  <main v-if="article" class="mb-5">

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
          class="article-content"
          v-html="articleHtml"
        ></div>
      </article>
    </section>

  </main>
</template>