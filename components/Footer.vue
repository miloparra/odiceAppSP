<script setup>
const lang = useLang()

const legalNoticesLabel = computed(() =>
  lang.value === 'fr' ? 'Mentions légales' : 'Legal Notices'
)

const privatePolicyLabel = computed(() =>
  lang.value === 'fr' ? 'Politique de confidentialité' : 'Personal Data Policy'
)
</script>

<template>
    <div class="
            bg-white
            flex flex-col lg:flex-row 
            justify-center items-center
            text-sm lg:text-base
            space-y-2 lg:space-y-0 lg:space-x-10
            w-full
            h-30
            shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]
            z-50">
        <a 
          href="https://www.linkedin.com/in/michel-droubay-357923206/?originalSubdomain=fr" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <font-awesome-icon icon="fa-brands fa-linkedin" class="text-xl" />
        </a>
        <p class="hidden lg:block">|</p>
        <NuxtLink to="/legalMentions" class="hover:underline">{{ legalNoticesLabel }}</NuxtLink>
        <p class="hidden lg:block">|</p>
        <NuxtLink to="/confidentiality" class="hover:underline">{{ privatePolicyLabel }}</NuxtLink>
    </div>
</template>