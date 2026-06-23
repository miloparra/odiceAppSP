export const useLang = () => {
    const cookie = useCookie('lang', { default: () => 'fr' })
    return useState('lang', () => cookie.value)
}