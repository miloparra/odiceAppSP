import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faDownload, faAngleDown, faArrowDown, faGraduationCap, faEarthEurope, faScaleBalanced, faDumbbell, faRoad, faPencil } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add(
    faEye,
    faDownload,
    faAngleDown,
    faLinkedin,
    faArrowDown,
    faGraduationCap,
    faEarthEurope,
    faScaleBalanced,
    faDumbbell,
    faRoad,
    faPencil
)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
