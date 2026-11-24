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

const message = computed(() =>
  lang.value === 'fr' ? 'Des articles arriveront prochainement !' : 'Artcles will arrive soon !'
)

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
  <section id="blog" class="scroll-mt-16 px-5 xl:px-60 py-9 lg:py-14">
    <div class="px-10 lg:px-5 pb-10 lg:pb-15 space-y-2">
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
    <div v-if="articles.length === 0" class="px-10 pb-10 lg:text-xl">
      {{ message }}
    </div>
    <div v-if="error" class="text-red-500">
      Impossible de charger les articles.
    </div>
    <!-- Articles -->
    <div
      class="
        flex gap-4 overflow-x-auto snap-x snap-mandatory
        px-[12%] pb-6
        md:grid md:grid-cols-2 md:overflow-visible md:px-5
        lg:grid-cols-3
      "
    >
      <div
        v-for="article in articles"
        :key="article.sys.id"
        class="
          flex-none w-[76vw] snap-center
          md:w-auto
        "
      >
        <ArticleCard :article="article" />
      </div>
    </div>
  </section>
</template>

<style>
/* Masquer la scrollbar du carousel */
.overflow-x-auto {
  scrollbar-width: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>