import { createRouter, createWebHistory } from 'vue-router'
import Pregled from '@/views/Pregled.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Pregled',
      component: Pregled
    },
    {
      path: '/kategorije-troskova',
      name: 'KategorijeTroskova',
      component: () => import('@/views/KategorijeTroskova.vue')
    },
    {
      path: '/kategorije-prihoda',
      name: 'KategorijePrihoda',
      component: () => import('@/views/KategorijePrihoda.vue')
    }
  ]
})

export default router
