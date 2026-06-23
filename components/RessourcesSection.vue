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
const defaultLocale = 'en-US'

const ressourcesIntroduction = ref(null)

async function fetchRessourcesIntroduction(locale) {
  try {
    const entries = await $contentful.getEntries({
      content_type: 'ressourcesIntroduction',
      locale
    })
    ressourcesIntroduction.value = entries.items[0]?.fields || null
  } catch (err) {
    console.error('❌ "Ressources Introduction" recovery error:', err)
  }
}

const ressources = ref([])

async function fetchRessources(locale) {
  try {
    // 1. Localized request
    const localized = await $contentful.getEntries({
      content_type: 'ressources',
      locale
    })

    // 2. Default request (for non-localized fields)
    const defaults = await $contentful.getEntries({
      content_type: 'ressources',
      locale: defaultLocale
    })

    // 3. Fusion
    ressources.value = localized.items
      .sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0))
      .map(ressource => {
        const defaultRessource = defaults.items.find(
          s => s.sys.id === ressource.sys.id
        )

        return {
          ...ressource,
          fields: {
            ...ressource.fields,
            pictogram: defaultRessource?.fields?.pictogram,
            document: defaultRessource?.fields?.document
          }
        }
      })
  } catch (err) {
    console.error('❌ Resource recovery error:', err)
  }
}

const message = computed(() =>
  lang.value === 'fr' ? 'Des ressources arriveront prochainement !' : 'Resources will arrive soon !'
)

// Initial load
onMounted(() => {
  fetchRessources(lang.value)
  fetchRessourcesIntroduction(lang.value)
})

// Refresh on lang change
watch(lang, (newLang) => {
  fetchRessources(newLang)
  fetchRessourcesIntroduction(lang.value)
})
</script>

<template>
  <section id="ressources" class="bg-[#5452e5] scroll-mt-16 px-5 xl:px-60 pt-10 pb-25">
    <div class="px-10 lg:px-5 py-10 space-y-2">
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
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-items-center">
      <div v-for="ressource in ressources" :key="ressource.sys.id" class="card bg-white w-9/10 lg:w-96 rounded-2xl shadow-xl">
        <figure>
        <img class="h-40 scale-150 object-cover"
        :src="`https:${ressource.fields.pictogram.fields.file.url}`"
        :alt="ressource.fields.pictogram.fields.title || 'Ressource image'" />
        </figure>
        <div class="card-body">
        <h2 class="card-title lg:text-xl font-medium">{{ ressource.fields.title }}</h2>
        <p class="text-sm lg:text-base">{{ ressource.fields.description }}</p>
        <div class="card-actions justify-end space-x-1">
            <button class="btn btn-primary w-12 h-12 rounded-full hover:scale-105 transition-transform duration-300">
            <a :href="`https:${ressource.fields.document.fields.file.url}`" download>
                <font-awesome-icon icon="fa-solid fa-download" class="text-base mt-1" />
            </a>
            </button>
            <button class="btn btn-primary w-12 h-12 rounded-full hover:scale-105 transition-transform duration-300">
            <a :href="`https:${ressource.fields.document.fields.file.url}`" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon icon="fa-solid fa-eye" class="text-base mt-1" />
            </a>
            </button>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>