import { createWebHashHistory, createRouter } from 'vue-router'

import Login from '../views/login/Login.vue'
import User from '../views/user/User.vue'
import Home from '../views/home/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/user', component: User },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
