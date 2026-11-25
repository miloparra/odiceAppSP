<script setup>
import { marked } from 'marked'
const { $contentful } = useNuxtApp()

useHead({
  title: 'ODicé - Expert en mobilité internationale | Michel Droubay',
  meta: [
    // Description globale
    {
      name: 'description',
      content: 'ODicé, fondée par Michel Droubay, propose un accompagnement spécialisé pour les personnes souhaitant s’installer durablement en France.'
    },

    // Open Graph
    { property: 'og:title', content: 'ODicé - Expert en mobilité internationale | Michel Droubay' },
    { property: 'og:description', content: 'ODicé, fondée par Michel Droubay, propose un accompagnement spécialisé pour les personnes souhaitant s’installer durablement en France.' },
    { property: 'og:url', content: 'https://www.odice-immigration.com/#about' },

    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'ODicé - Expert en mobilité internationale | Michel Droubay' },
    { name: 'twitter:description', content: 'ODicé, fondée par Michel Droubay, propose un accompagnement spécialisé pour les personnes souhaitant s’installer durablement en France.' },
  ]
})

const lang = useLang()
const about = ref(null)
const route = useRoute()

async function fetchAbout(locale) {
  try {
    const entries = await $contentful.getEntries({
      content_type: 'about',
      locale
    })
    if (entries.items[0]) {
      const fields = entries.items[0].fields
      // Transformer le champ "presentation" en HTML
      about.value = {
        ...fields,
        presentationHtml: marked.parse(fields.presentation || '')
      }
    }
  } catch (err) {
    console.error('❌ "About" recovery error:', err)
  }
}

onMounted(() => {
  fetchAbout(lang.value)
  if (route.hash) {
    // Wait for the element to be well made
    setTimeout(() => {
      const el = document.querySelector(route.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
})

watch(lang, (newLang) => {
  fetchAbout(newLang)
})

const contactLabel = computed(() =>
  lang.value === 'fr' ? 'Nous contacter' : 'Contact us'
)

const serviceLabel = computed(() =>
  lang.value === 'fr' ? 'Nos services' : 'Our services'
)

const lernMoreLabel = computed(() =>
  lang.value === 'fr' ? 'En savoir plus' : 'Learn more'
)

const isAboutExpanded = ref(false)
</script>

<template>
  <div class="bg-white">

    <!-- HOME SECTION -->
    <section id="home" class="scroll-mt-16">
      <img style="height: calc(100vh + 65px)" class="absolute w-full -top-16 filter brightness-60 object-cover"
      src="public/flags.jpg" alt="">
      <div class="reactive w-full h-screen -top-16">
        <div class="h-screen absolute flex flex-col justify-between top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="h-20"></div>
          <div class="space-y-10">
            <h1 class="
                text-center
                welcomeTitle
                text-white
                text-4xl
                lg:text-6xl">
              {{ about?.title }}
            </h1>
            <div class="lg:flex lg:justify-center lg:gap-5">
              <NuxtLink to="#contact" class="flex justify-center mb-3 lg:mb-0">
                <button class="
                    rounded-full
                    px-10
                    py-3
                    text-sm
                    lg:text-lg
                    font-semibold
                    text-white
                    border
                    hover:bg-[oklch(45%_.24_277.023)]
                    hover:border-[oklch(45%_.24_277.023)]
                    cursor-pointer
                    hover:scale-103
                    hover:shadow-2xl
                    transition-transform-colors duration-300 ease-in-out">
                    {{ contactLabel }}
                </button>
              </NuxtLink>
              <NuxtLink to="#services" class="flex justify-center">
                <button class="
                    rounded-full
                    px-10
                    py-3
                    text-sm
                    lg:text-lg
                    font-semibold
                    text-white
                    border
                    lg:hover:font-medium
                    hover:text-black
                    hover:bg-[#8FDA59]
                    hover:border-[#8FDA59]
                    cursor-pointer
                    hover:scale-103
                    hover:shadow-2xl
                    transition-transform-colors duration-300 ease-in-out">
                    {{ serviceLabel }}
                </button>
              </NuxtLink>
            </div>
          </div>
          <div class="h-20 flex justify-center">
            <NuxtLink class="hover:scale-115 transition-transform duration-300" to="/#about"><font-awesome-icon icon="fa-solid fa-arrow-down" class="text-white text-2xl lg:text-4xl animate-bounce"/></NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section id="about" class="scroll-mt-16">
      <div class="flex justify-center">

        <!-- PC AND TABLET DISPLAY - BASIC VERSION -->
         <div class="w-5/7 lg:w-6/7 mt-5 mb-15 lg:my-20">

          <div class="lg:flex items-center gap-10">
            <!-- Colonne photo -->
            <div class="flex justify-center py-10 shrink-0 w-full lg:w-1/3">
              <img
                class="w-40 h-40 xl:w-80 xl:h-80 object-cover rounded-full"
                src="../public/michel.jpeg"
              />
            </div>
            <!-- Colonne présentation -->
            <div class="flex-1 min-w-0">

              <div class="relative">

                <!-- Texte -->
                <div
                  class="prose lg:text-justify whitespace-pre-line transition-all duration-500"
                  :class="{
                    'max-h-[130px] overflow-hidden lg:max-h-none': !isAboutExpanded
                  }"
                  v-html="about?.presentationHtml"
                ></div>

                <!-- Dégradé mobile -->
                <div
                  v-if="!isAboutExpanded"
                  class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent lg:hidden"
                ></div>

              </div>

              <!-- Bouton mobile -->
              <button
                @click="isAboutExpanded = !isAboutExpanded"
                class="lg:hidden flex items-center justify-center gap-2 mx-auto mt-3 mb-10 text-[#7d7d7d] font-semibold hover:opacity-75 transition"
              >
                <span>
                  {{ isAboutExpanded ? 'Réduire' : 'Lire la suite' }}
                </span>

                <font-awesome-icon
                  :icon="isAboutExpanded ? 'fa-solid fa-minus' : 'fa-solid fa-plus'"
                />
              </button>

            </div>
          </div>
          <NuxtLink to="#services" class="flex justify-center mt-5 lg:mt-15">
            <button class="
                rounded-full
                px-10
                py-3
                text-sm
                lg:text-lg
                font-semibold
                text-[#8FDA59]
                border-2
                border-[#8FDA59]
                lg:hover:font-medium
                hover:text-black
                hover:bg-[#8FDA59]
                cursor-pointer
                hover:scale-103
                hover:shadow-2xl
                transition-transform-colors duration-300 ease-in-out">
                {{ lernMoreLabel }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>