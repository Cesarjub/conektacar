import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTelInput from 'vue-tel-input'
//import 'vue-tel-input/dist/vue-tel-input.css'
//import LoadScript from 'vue-plugin-load-script'

// JS de Bootstrap 5
import "bootstrap"

// CSS de Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"

createApp(App).use(store).use(router).use(VueTelInput).mount('#app')
