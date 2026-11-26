
<script setup>
const { data: reviewsHtml, error } = await useAsyncData(
  'revys-reviews',
  () => $fetch('/api/revys')
)
</script>

<template>
  <section v-if="reviewsHtml" class="google-reviews">
    <div v-html="reviewsHtml"></div>
  </section>
</template>
