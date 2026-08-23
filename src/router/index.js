import { createRouter, createWebHistory } from 'vue-router'
import Pregled from '@/views/Pregled.vue'
import Prijava from '@/views/Prijava.vue'
import { useAuthStore } from '@/store/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/prijava',
      name: 'Prijava',
      component: Prijava,
      meta: { zahtijevaPrijavu: false, sakrijSidebar: true }
    },
    {
      path: '/',
      name: 'Pregled',
      component: Pregled,
      meta: { zahtijevaPrijavu: true }
    },
    {
      path: '/kategorije-troskova',
      name: 'KategorijeTroskova',
      component: () => import('@/views/KategorijeTroskova.vue'),
      meta: { zahtijevaPrijavu: true }
    },
    {
      path: '/kategorije-prihoda',
      name: 'KategorijePrihoda',
      component: () => import('@/views/KategorijePrihoda.vue'),
      meta: { zahtijevaPrijavu: true }
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.zahtijevaPrijavu && !authStore.user) {
    return { name: 'Prijava' }
  }

  if (to.name === 'Prijava' && authStore.user) {
    return { name: 'Pregled' }
  }
})

export default router