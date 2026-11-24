
<script setup>
const props = defineProps({
  ressource: {
    type: Object,
    required: true
  }
})

</script>

<template>
    <NuxtLink
        :to="`https:${ressource.fields.document.fields.file.url}`"
        class="group block"
    >
        <article
            class="h-full lg:w-auto overflow-hidden rounded-2xl bg-white shadow-md
                    transition-all duration-300
                    group-hover:-translate-y-3 group-hover:shadow-xl"
        >

            <!-- Image -->
            <div class="overflow-hidden">
            <img
                v-if="ressource.fields.pictogram?.fields?.file?.url"
                :src="`https:${ressource.fields.pictogram.fields.file.url}`"
                :alt="ressource.fields.pictogram.fields.title || ressource.fields.title"
                class="h-25 md:h-50 w-full object-cover transition-transform
                        duration-500 group-hover:scale-105"
            >
            </div>

            <!-- Contenu -->
            <div class="p-4">

            <!-- Titre -->
            <h3
                class="text-xl font-medium text-[#483b3b]
                        transition-colors group-hover:text-[#8a6f6f]"
            >
                {{ ressource.fields.title }}
            </h3>

            <!-- Description -->
            <p
                v-if="ressource.fields.description"
                class="line-clamp-3 text-sm leading-relaxed text-gray-600"
            >
                {{ ressource.fields.description }}
            </p>

            <div class="flex justify-end space-x-3 mt-4">
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
        </article>
    </NuxtLink>
</template>
