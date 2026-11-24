<script setup>
const { $contentful } = useNuxtApp()
const lang = useLang()

const blogIntroduction = ref(null)
const articles = ref([])
const error = ref(null)

const fetchBlogIntroduction = async (locale) => {
  try {
    const response = await $contentful.getEntries({
      content_type: 'blogIntroduction',
      locale
    })
    blogIntroduction.value = response.items[0]?.fields || null

  } catch (err) {
    console.error('Erreur Blog Introduction:', err)
  }
}

const loadArticles = async (locale) => {
  try {
    const response = await $contentful.getEntries({
      content_type: 'article',
      order: '-fields.publishedAt',
      locale,
      include: 1
    })
    articles.value = response.items

  } catch (err) {
    console.error('Erreur Contentful:', err)
    error.value = err
  }
}

// Initial load
onMounted(() => {
  fetchBlogIntroduction(lang.value)
  loadArticles(lang.value)
})

// Refresh on lang change
watch(lang, (newLang) => {
  fetchBlogIntroduction(newLang)
  loadArticles(newLang)
})
</script>

<template>
  <section id="blog" class="scroll-mt-16 px-5 xl:px-60 py-15 lg:py-20">
    <div class="px-10 lg:px-5 pb-10 lg:pb-20 space-y-2">
        <p class="ml-1 mb-2 text-sm font-medium uppercase tracking-widest text-gray-500">
            {{ blogIntroduction?.tag }}
        </p>
        <div class="font-semibold text-4xl lg:text-5xl text-[#483b3b]">
            {{ blogIntroduction?.title }}
        </div>
        <div class="xl:w-150 font-medium lg:text-2xl whitespace-pre-line text-gray-500">
            {{ blogIntroduction?.introduction }}
        </div>
    </div>
    <div v-if="error" class="text-red-500">
      Impossible de charger les articles.
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5">
      <ArticleCard
          v-for="article in articles"
          :key="article.sys.id"
          :article="article"
        />
    </div>
  </section>
</template>