export default defineCachedEventHandler(async () => {
    try {
        const html = await $fetch(
            'https://revys.io/api/embed/GXH34m5nd1qg/html',
            {
                responseType: 'text',
                timeout: 5000
            }
        )

        return html
    } catch (error) {
        console.error('Erreur Revys :', error)
        throw createError({
            statusCode: 502,
            statusMessage: 'Impossible de récupérer les avis Google'
        })
    }
}, {
    maxAge: 3600,
    name: 'revys-reviews'
})