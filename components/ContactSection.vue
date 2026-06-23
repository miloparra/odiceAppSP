<script setup>
useHead({
  title: 'ODicé - Contact | Conseil en mobilité internationale avec Michel Droubay',
  meta: [
    // Description globale
    {
      name: 'description',
      content: 'Prenez contact avec Michel Droubay via ODicé pour recevoir un accompagnement personnalisé selon votre situation administrative.'
    },

    // Open Graph
    { property: 'og:title', content: 'Contactez ODicé - Michel Droubay' },
    { property: 'og:description', content: 'Formulaire de contact pour bénéficier de l’accompagnement d’ODicé dans votre projet.' },
    { property: 'og:url', content: 'https://www.odice-immigration.com/#contact' },

    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Contactez ODicé - Michel Droubay' },
    { name: 'twitter:description', content: 'Formulaire de contact pour bénéficier de l’accompagnement d’ODicé dans votre projet.' },
  ]
})

const lang = useLang()

const contactLabel = computed(() =>
  lang.value === 'fr' ? 'Nous contacter' : 'Contact us'
)
const birthLabel = computed(() =>
  lang.value === 'fr' ? 'Date de naissance' : 'Date of birth'
)
const arrivalLabel = computed(() =>
  lang.value === 'fr' ? 'Arrivée en France' : 'Arrival in France'
)
const sendButtonLabel = computed(() =>
  lang.value === 'fr' ? 'Envoyer' : 'Send'
)
const situationLabel = computed(() => 
  lang.value === 'fr' ? 'Votre situation' : 'Your situation'
)

const placeholders = computed(() => ({
  organizationName: lang.value === 'fr' ? "Nom de l'association" : 'Organization name',
  lawyerName: lang.value === 'fr' ? 'Nom du cabinet' : "Lawyer's name",
  companyName: lang.value === 'fr' ? "Nom de l'entreprise" : 'Company name',
  lastName: lang.value === 'fr' ? 'Nom' : 'Last name',
  firstName: lang.value === 'fr' ? 'Prénom' : 'First name',
  phoneNumber: lang.value === 'fr' ? 'Numéro de téléphone' : 'Phone number',
  email: lang.value === 'fr' ? 'Adresse mail' : 'Email address',
  requestMotif: lang.value === 'fr' ? 'Motif de la demande' : 'Request motive',
  moreInfo: lang.value === 'fr' ? 'Informations complémentaires' : 'Additional information',
}))

const options = computed(() => [
  { value: 'organization', label: lang.value === 'fr' ? 'Association' : 'Organization' },
  { value: 'lawyer', label: lang.value === 'fr' ? 'Avocat' : 'Lawyer' },
  { value: 'company', label: lang.value === 'fr' ? 'Entreprise' : 'Company' },
  { value: 'individual', label: lang.value === 'fr' ? 'Particulier' : 'Individual' },
])

const form = reactive({
  situation: '',
  organizationName: '',
  lawyerName: '',
  companyName: '',
  lastName: '',
  firstName: '',
  phoneNumber: '',
  email: '',
  birthDate: '',
  landDate: '',
  requestMotif: '',
  moreInfo: ''
})

const resetForm = () => {
  form.situation = '',
  form.organizationName = '',
  form.lawyerName = '',
  form.companyName = '',
  form.lastName = '',
  form.firstName = '',
  form.phoneNumber = '',
  form.email = '',
  form.birthDate = '',
  form.landDate = '',
  form.requestMotif = '',
  form.moreInfo = ''
}

onMounted(() => {
  form.situation = 'individual'
})

const submitForm = async () => {
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form
    })
    alert('Message envoyé !')
    resetForm()
  } catch (error) {
    alert('Erreur lors de l\'envoi du message')
  }
}
</script>

<template>
  <section id="contact" class="scroll-mt-16 grid grid-cols-1 lg:grid-cols-5 lg:gap-4 bg-white">
    <div class="hidden lg:block col-span-2">
      <img class="w-full h-[calc(100vh-65px)] object-cover" src="./../public/toulouse2.jpg" alt="">
    </div>
    <form @submit.prevent="submitForm" class="flex justify-center items-center px-4 my-10 lg:my-0 lg:col-span-3">
      <div>
        <h1 class="text-center text-4xl pb-5 md:pb-10">{{ contactLabel }}</h1>
        <div class="flex justify-center mb-5">
          <a
            href="https://www.linkedin.com/in/michel-droubay-357923206/?originalSubdomain=fr" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <font-awesome-icon icon="fa-brands fa-linkedin" class="text-3xl" />
          </a>
        </div>
        <div class="flex justify-center mb-6">
          <div class="relative w-full max-w-xs">
            <select v-model="form.situation" class="appearance-none border border-gray-300 rounded-full p-2 px-6 w-full">
              <option disabled value="">{{ situationLabel }}</option>
              <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <font-awesome-icon
              icon="fa-solid fa-angle-down"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div class="grid grid-cols-6 gap-5 lg:w-3/4">
            <input v-model="form.organizationName" v-if="form.situation === 'organization'" type="text" class="col-span-6 border border-gray-300 rounded-full p-2 px-6 w-full"
              :placeholder="placeholders.organizationName">
            <input v-model="form.lawyerName" v-if="form.situation === 'lawyer'" type="text" class="col-span-6 border border-gray-300 rounded-full p-2 px-6 w-full"
              :placeholder="placeholders.lawyerName">
            <input v-model="form.companyName" v-if="form.situation === 'company'" type="text" class="col-span-6 border border-gray-300 rounded-full p-2 px-6 w-full"
              :placeholder="placeholders.companyName">
            <input v-model="form.lastName" v-if="form.situation === 'individual'" type="text" class="col-span-3 border border-gray-300 rounded-full p-2 px-6 w-full"
              :placeholder="placeholders.lastName">
            <input v-model="form.firstName" v-if="form.situation === 'individual'" type="text" class="col-span-3 border border-gray-300 rounded-full p-2 px-6 w-full"
              :placeholder="placeholders.firstName">
            <input v-model="form.phoneNumber" type="tel" class="col-span-6 sm:col-span-2 border border-gray-300 rounded-full p-2 px-6 w-full"
              :placeholder="placeholders.phoneNumber">
            <input v-model="form.email" type="email" class="col-span-6 sm:col-span-4 border border-gray-300 rounded-full p-2 px-6 w-full"
              :placeholder="placeholders.email">
            <div class="col-span-6 sm:col-span-3" v-if="form.situation === 'individual'">
              <label for="with-corner-hint" class="block mb-1 ml-5 text-sm font-medium text-gray-700 w-full">{{ birthLabel }}</label>
              <input v-model="form.birthDate" type="date" class="border border-gray-300 rounded-full p-2 px-6 w-full">
            </div>
            <div class="col-span-6 sm:col-span-3" v-if="form.situation === 'individual'">
              <label for="with-corner-hint" class="block mb-1 ml-5 text-sm font-medium text-gray-700 w-full">{{ arrivalLabel }}</label>
              <input v-model="form.landDate" type="date" class="border border-gray-300 rounded-full p-2 px-6 w-full">
            </div>
            <input v-model="form.requestMotif" type="text"
              class="col-span-6 border border-gray-300 rounded-full p-2 px-6 w-full" :placeholder="placeholders.requestMotif">
            <textarea v-model="form.moreInfo" type="text"
              class="col-span-6 h-30 border border-gray-300 rounded-[20px] p-2 px-6 w-full"
              :placeholder="placeholders.moreInfo"></textarea>
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <button type="submit" class="btn btn-outline btn-primary rounded-full px-5">{{ sendButtonLabel }}</button>
        </div>
      </div>
    </form>
  </section>
</template>