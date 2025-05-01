import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: to => '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
  })

export default router
