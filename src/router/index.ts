import { isLoginOrActivateAccount, isNotLogin } from '@/guards/authentification.guard'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RoutesApp } from './router.app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      beforeEnter: [isNotLogin],
      component: LoginView
    },
    {
      path: '/secure',
      name: 'app',
      beforeEnter: [isLoginOrActivateAccount],
      component: () => import('../views/AboutView.vue'),
      children: RoutesApp
    },
    {
// for page not found
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: PageNotFound,
    }
  ]
})

export default router
