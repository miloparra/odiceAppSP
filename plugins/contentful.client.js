import { createClient } from 'contentful'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  const client = createClient({
    space: config.public.CONTENTFUL_SPACE_ID,
    environment: config.public.CONTENTFUL_ENVIRONMENT,
    accessToken: config.public.CONTENTFUL_ACCESS_TOKEN,
  })

  return {
    provide: {
      contentful: client,
    },
  }
})