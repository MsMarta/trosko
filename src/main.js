import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createBootstrap } from 'bootstrap-vue-next'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './store/auth'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(createBootstrap())

const authStore = useAuthStore()

authStore.init().then(() => {
  app.mount('#app')
})