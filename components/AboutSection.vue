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
</script>

<template>
  <div class="bg-white">
    <section id="home" class="scroll-mt-[65px]">
      <img style="height: calc(100vh + 65px)" class="absolute w-full top-[-65px] filter brightness-80 object-cover"
      src="public/volcanIA2.png" alt="">
      <div class="reactive w-full h-screen top-[-65px]">
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
                    border-1
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
                    border-1
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

    <section id="about" class="scroll-mt-[65px]">
      <div class="flex justify-center mt-[-65px]">
        <div class="
            relative
            w-5/6
            mt-20 mb-20
            bg-[#F4F3FF]
            p-7 lg:p-15
            lg:text-lg
            shadow-lg">
          <p class="guillemets absolute top-[-18px] lg:top-[-25px] left-[2px] text-8xl lg:text-9xl text-zinc-600">"</p>
          <img class="
            float-left
            w-70
            h-70
            object-cover
            p-7 pb-11 lg:pr-7 lg:pt-0 lg:pb-7 lg:pl-0
            rounded-full" src="../public/michel.jpeg" />
          <p class="prose md:text-justify whitespace-pre-line" v-html="about?.presentationHtml"></p>
          <NuxtLink to="#services" class="flex justify-center mt-10">
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
          <p class="guillemets absolute right-[5px] bottom-[-75px] lg:bottom-[-100px] text-8xl lg:text-9xl text-zinc-600">"
          </p>
        </div>
      </div>
    </section>
  </div>
</template>