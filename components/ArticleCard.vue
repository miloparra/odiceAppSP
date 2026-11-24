
<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const lang = useLang()

const formattedDate = computed(() => {
  if (!props.article.fields.publishedAt) return ''

  return new Date(props.article.fields.publishedAt).toLocaleDateString(
    lang.value === 'fr' ? 'fr-FR' : 'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  )
})

const readMore = computed(() =>
  lang.value === 'fr' ? "Lire l'article" : 'Read article'
)
</script>

<template>
  <NuxtLink
    :to="`/blog/${article.fields.slug}`"
    class="group block"
  >
    <article
      class="h-full lg:w-auto overflow-hidden rounded-2xl bg-white shadow-md
             transition-all duration-300
             group-hover:-translate-y-3 group-hover:shadow-xl"
    >

      <!-- Image -->
      <div class="overflow-hidden">
        <img
          v-if="article.fields.coverImage?.fields?.file?.url"
          :src="`https:${article.fields.coverImage.fields.file.url}`"
          :alt="article.fields.coverImage.fields.title || article.fields.title"
          class="h-25 md:h-50 w-full object-cover transition-transform
                 duration-500 group-hover:scale-105"
        >
      </div>

      <!-- Contenu -->
      <div class="p-4">

        <!-- Date -->
        <p
          v-if="formattedDate"
          class="mb-2 text-sm text-gray-400"
        >
          {{ formattedDate }}
        </p>

        <!-- Titre -->
        <h3
          class="text-xl font-medium text-[#483b3b]
                 transition-colors group-hover:text-[#8a6f6f]"
        >
          {{ article.fields.title }}
        </h3>

        <!-- Description -->
        <p
          v-if="article.fields.excerpt"
          class="line-clamp-3 text-sm leading-relaxed text-gray-600"
        >
          {{ article.fields.excerpt }}
        </p>

        <!-- Lire -->
        <div
          class="mt-2 flex items-center gap-2 text-sm font-medium
                 text-[#483b3b]"
        >
          {{ readMore }}

          <span
            class="transition-transform duration-300
                   group-hover:translate-x-1"
          >
            →
          </span>
        </div>

      </div>
    </article>
  </NuxtLink>
</template>
