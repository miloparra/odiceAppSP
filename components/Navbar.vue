<script setup>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import fullLogoW from '@/public/logo/fullLogoW.png'
import fullLogoB from '@/public/logo/fullLogoB.png'
import fullLogoFreePalestineW from '@/public/logo/fullLogoFreePalestineW.png'
import fullLogoFreePalestineB from '@/public/logo/fullLogoFreePalestineB.png'

const route = useRoute()
const lang = useLang()

function changeLang(locale) {
  lang.value = locale
  useCookie('lang').value = locale
}

// TRANSLATION

const aboutTab = computed(() =>
  lang.value === 'fr' ? 'Qui suis-je ?' : 'Who am I ?'
)

const resourcesTab = computed(() =>
  lang.value === 'fr' ? 'Ressources' : 'Resources'
)

// ON SCROLL MANAGEMENT

const scrolled = ref(false)
const threshold = 80

const handleScroll = () => {
  scrolled.value = window.scrollY > threshold
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isTranparentTheme = computed(() =>
  !scrolled.value
)

const navbarClasses = computed(() =>
  isTranparentTheme.value ? 'bg-transparent' : 'bg-white shadow-sm'
)

const logoSrc = computed(() =>
  isTranparentTheme.value ? fullLogoW : fullLogoB
)

const logoFreePalestineSrc = computed(() =>
  isTranparentTheme.value ? fullLogoFreePalestineW : fullLogoFreePalestineB
)

const currentLogo = ref(logoSrc.value)

watch(logoSrc, (newLogo) => {
  // Si on n’est pas en hover, on met à jour le logo normalement
  if (!isHovering.value) currentLogo.value = newLogo
})

const isHovering = ref(false)

const handleMouseOver = () => {
  isHovering.value = true
  currentLogo.value = logoFreePalestineSrc.value
}

const handleMouseLeave = () => {
  isHovering.value = false
  currentLogo.value = logoSrc.value
}
const textColorClass = computed(() =>
  isTranparentTheme.value ? 'text-white font-medium' : 'text-black'
)

// 👉 Gestion de la sidebar
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// Empêcher le scroll quand la sidebar est ouverte
watch(sidebarOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<template>
  <div class="navbar sticky top-0 z-50 transition-colors duration-1000" :class="navbarClasses">
    <div class="navbar-start">
      <div class="lg:hidden flex items-center justify-center ml-3">
        <button @click="toggleSidebar" :class="textColorClass">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>
      </div>
      <NuxtLink to="#home" class="ml-2">
        <img
          class="w-20 lg:w-27 ml-2 transition-opacity duration-200"
          :src="currentLogo"
          alt="Logo"
          @mouseover="handleMouseOver"
          @mouseleave="handleMouseLeave"
        />
      </NuxtLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 space-x-10" :class="textColorClass">
        <li><NuxtLink to="#about" class="uppercase">{{ aboutTab }}</NuxtLink></li>
        <li><NuxtLink to="#services" class="uppercase">Services</NuxtLink></li>
        <li><NuxtLink to="#blog" class="uppercase">Blog</NuxtLink></li>
        <li><NuxtLink to="#ressources" class="uppercase">{{ resourcesTab }}</NuxtLink></li>
        <li><NuxtLink to="#contact" class="uppercase">Contact</NuxtLink></li>
      </ul>
    </div>

    <div class="navbar-end">
      <a :class="['filter hover:filter hover:brightness-100 mr-4', lang === 'fr' ? '' : 'brightness-60']" @click="changeLang('fr')">
        <span class="fi fi-fr w-6 h-4 rounded-full"></span>
      </a>
      <a :class="['filter hover:filter hover:brightness-100 mr-4', lang === 'en-US' ? '' : 'brightness-60']" @click="changeLang('en-US')">
        <span class="fi fi-gb w-6 h-4 rounded-full"></span>
      </a>
    </div>
  </div>

  <!-- Sidebar (mobile) -->
  <transition name="slide">
    <div v-if="sidebarOpen" class="fixed inset-0 z-51 bg-white flex flex-col p-6 transition-transform duration-500 transform translate-x-0">
      <button class="self-end mb-6" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ul class="space-y-4 text-lg">
        <li><NuxtLink @click="toggleSidebar" to="#about">{{ aboutTab }}</NuxtLink></li>
        <li><NuxtLink @click="toggleSidebar" to="#services">Services</NuxtLink></li>
        <li><NuxtLink @click="toggleSidebar" to="#blog">Blog</NuxtLink></li>
        <li><NuxtLink @click="toggleSidebar" to="#ressources">{{ resourcesTab }}</NuxtLink></li>
        <li><NuxtLink @click="toggleSidebar" to="#contact">Contact</NuxtLink></li>
      </ul>
    </div>
  </transition>
</template>

<style>
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
