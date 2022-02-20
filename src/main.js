import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// JS de Bootstrap 5
import "bootstrap"

// CSS de Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"

createApp(App).use(store).use(router).mount('#app')
