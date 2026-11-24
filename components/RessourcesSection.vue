<script setup>
const { $contentful } = useNuxtApp()

useHead({
  title: 'ODicé - Ressources gratuites | Aide en mobilité internationale',
  meta: [
    // Description globale
    {
      name: 'description',
      content: 'Accédez à des documents gratuits préparés par ODicé : guides pratiques, fiches d’information, listes de questions, et ressources utiles pour préparer vos démarches en France.'
    },

    // Open Graph
    { property: 'og:title', content: 'ODicé - Guides & documents' },
    { property: 'og:description', content: 'Téléchargez des ressources fiables créées par ODicé pour faciliter votre projet d’installation en France.' },
    { property: 'og:url', content: 'https://www.odice-immigration.com/#ressources' },

    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'ODicé - Guides & documents' },
    { name: 'twitter:description', content: 'Téléchargez des ressources fiables créées par ODicé pour faciliter votre projet d’installation en France.' },
  ]
})

const lang = useLang()

const ressourcesIntroduction = ref(null)
const ressources = ref([])
const error = ref(null)

const loadRessourcesIntroduction = async (locale) => {
  try {
    const response = await $contentful.getEntries({
      content_type: 'ressourcesIntroduction',
      locale
    })
    ressourcesIntroduction.value = response.items[0]?.fields || null

  } catch (err) {
    console.error('Erreur Ressources Introduction:', err)
  }
}

const loadRessources = async (locale) => {
  try {
    const response = await $contentful.getEntries({
      content_type: 'ressources',
      locale,
      include: 1
    })
    ressources.value = response.items

  } catch (err) {
    console.error('Erreur Contentful:', err)
    error.value = err
  }
}

const message = computed(() =>
  lang.value === 'fr' ? 'Des ressources arriveront prochainement !' : 'Resources will arrive soon !'
)

// Initial load
onMounted(() => {
  loadRessourcesIntroduction(lang.value)
  loadRessources(lang.value)
})

// Refresh on lang change
watch(lang, (newLang) => {
  loadRessourcesIntroduction(newLang)
  loadRessources(newLang)
})
</script>

<template>
  <section id="ressources" class="bg-[#5452e5] scroll-mt-16 px-5 xl:px-60 py-15 lg:py-20">
    <div class="px-10 lg:px-5 pb-10 lg:pb-20 space-y-2">
        <p class="ml-1 mb-2 text-sm font-medium uppercase tracking-widest text-[#dddddd]">
            {{ ressourcesIntroduction?.tag }}
        </p>
        <div class="font-semibold text-4xl lg:text-5xl text-white">
            {{ ressourcesIntroduction?.title }}
        </div>
        <div class="xl:w-150 text-[#dddddd] font-medium lg:text-2xl whitespace-pre-line">
            {{ ressourcesIntroduction?.introduction }}
        </div>
    </div>
    <div v-if="ressources.length === 0">
      {{ message }}
    </div>
    <div v-if="error" class="text-red-500">
      Impossible de charger les ressources.
    </div>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5">
      <RessourceCard
          v-for="ressource in ressources"
          :key="ressource.sys.id"
          :ressource="ressource"
        />
    </div>
  </section>
</template>