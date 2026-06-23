<script setup>
const { $contentful } = useNuxtApp()
const lang = useLang()
const privacyPolicy = ref(null)

async function fetchAbout(locale) {
  try {
    const entries = await $contentful.getEntries({
      content_type: 'privacyPolicy',
      locale
    })
    privacyPolicy.value = entries.items[0]?.fields || null
  } catch (err) {
    console.error('❌ "About" recovery error:', err)
  }
}

onMounted(() => {
  fetchAbout(lang.value)
})

watch(lang, (newLang) => {
  fetchAbout(newLang)
})
</script>

<template>
    <h1 class="px-12 mt-30 mb-15 text-xl lg:text-3xl text-center">{{ privacyPolicy?.title }}</h1>
    <div class="flex justify-center">
        <hr class="w-40">
    </div>
    <div class="py-10 px-12 lg:px-40 mt-5 text-justify whitespace-pre-line">{{ privacyPolicy?.description }}</div>
</template>