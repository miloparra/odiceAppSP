<script setup>
const { $contentful } = useNuxtApp()

useHead({
  title: 'ODicé - Services | Services d’accompagnement en mobilité internationale',
  meta: [
    // Description globale
    {
      name: 'description',
      content: 'ODicé propose un accompagnement complet : demandes de visa, régularisation, titres de séjour, naturalisation, droit de la famille, et autres démarches.'
    },

    // Open Graph
    { property: 'og:title', content: 'ODicé - Services d’accompagnement en mobilité internationale' },
    { property: 'og:description', content: 'Découvrez les services proposés par ODicé pour vous aider dans vos démarches administratives en France.' },
    { property: 'og:url', content: 'https://www.odice-immigration.com/#services' },

    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'ODicé - Services d’accompagnement en mobilité internationale' },
    { name: 'twitter:description', content: 'Découvrez les services proposés par ODicé pour vous aider dans vos démarches administratives en France.' },
  ]
})

const lang = useLang()
const defaultLocale = 'en-US'

const servicesIntroduction = ref(null)

async function fetchServicesIntroduction(locale) {
  try {
    const entries = await $contentful.getEntries({
      content_type: 'servicesIntroduction',
      locale
    })
    servicesIntroduction.value = entries.items[0]?.fields || null
  } catch (err) {
    console.error('❌ "Services Introduction" recovery error:', err)
  }
}

const services = ref([])

async function fetchServices(locale) {
  try {
    // 1. Localized request
    const localized = await $contentful.getEntries({
      content_type: 'services',
      locale
    })

    // 2. Default request (for non-localized fields)
    const defaults = await $contentful.getEntries({
      content_type: 'services',
      locale: defaultLocale
    })

    // 3. Fusion
    services.value = localized.items
      .sort((a, b) => (a.fields.order ?? 0) - (b.fields.order ?? 0))
      .map(service => {
        const defaultService = defaults.items.find(
          s => s.sys.id === service.sys.id
        )

        return {
          ...service,
          fields: {
            ...service.fields,
            pictogram: defaultService?.fields?.pictogram
          }
        }
      })
  } catch (err) {
    console.error('❌ Services recovery error:', err)
  }
}

// Initial load
onMounted(() => {
  fetchServices(lang.value)
  fetchServicesIntroduction(lang.value)
})

// Refresh on lang change
watch(lang, (newLang) => {
  fetchServices(newLang)
  fetchServicesIntroduction(lang.value)
})

const contactQuestion = computed(() =>
  lang.value === 'fr' ? 'Vous souhaitez optimiser vos démarches d’immigration professionnelle ?' : 'Do you want to optimize your professional immigration procedures?'
)

const contactLabel = computed(() =>
  lang.value === 'fr' ? 'Nous contacter' : 'Contact us'
)

// SERVICES COLLAPSE ARROW MANAGEMENT

const openId = ref(null)

const toggle = (id) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section id="services" class="bg-[#5452e5] scroll-mt-16 px-5 xl:px-60 py-10">
    <div class="px-5 py-15 space-y-2">
      <div class="font-semibold text-4xl lg:text-5xl text-white">
        {{ servicesIntroduction?.title }}
      </div>
      <div class="text-[#dddddd] font-medium lg:text-2xl whitespace-pre-line">
        {{ servicesIntroduction?.introduction }}
      </div>
    </div>
    <div v-for="service in services"
         :key="service.sys.id"
         class="px-20"
    >
      <div class="collapse bg-white rounded-[40px] pl-4 mb-4 shadow-xl hover:scale-102 transition-transform duration-400">
        <div class="collapse" :class="{ 'collapse-open': openId === service.sys.id }">
          <div class="collapse-title flex" @click="toggle(service.sys.id)">
              <div class="flex items-center mr-10">
                      <font-awesome-icon
                          :icon="service.fields.icon"
                          class="text-xl"
                      />
                  </div>
              <div class="flex justify-between items-center w-full">
                  <div>
                      <div class="serviceTitle text-sm lg:text-base font-medium">{{ service.fields.title }}</div>
                      <div class="text-sm lg:text-base">{{ service.fields.shortDescription }}</div>
                  </div>
                  <div class="flex items-center">
                      <font-awesome-icon
                          icon="fa-solid fa-angle-down"
                          class="text-base transition-transform duration-500"
                          :class="{ 'rotate-180': openId === service.sys.id }"
                      />
                  </div>
              </div>
          </div>
          <div class="collapse-content flex justify-center items-center">
            <div class="flex items-center md:w-4/5 my-3 md:my-6 md:mr-24">
              <img class="hidden md:block h-38 object-cover mr-10 rounded-full"
              :src="`https:${service.fields.pictogram.fields.file.url}`"
              :alt="service.fields.pictogram.fields.title || 'Service image'" />
              <div class="text-sm lg:text-base whitespace-pre-line">{{ service.fields.longDescription }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-5 py-5 lg:py-10 space-y-5">
      <div class="text-white flex justify-center lg:text-xl text-center">
        {{ contactQuestion }}
      </div>
      <NuxtLink to="#contact" class="flex justify-center">
        <button class="
            rounded-full
            px-10
            py-3
            text-sm
            lg:text-lg
            font-semibold
            text-white
            border-2
            border-white
            hover:text-white
            hover:border-[oklch(45%_.24_277.023)]
            hover:bg-[oklch(45%_.24_277.023)]
            cursor-pointer
            hover:scale-103
            hover:shadow-2xl
            transition-transform-colors duration-300 ease-in-out">
            {{ contactLabel }}
        </button>
      </NuxtLink>
    </div>
</section>
</template>