import { createRouter, createWebHistory } from 'vue-router'

import Main from '../pages/Main.vue'
import Login from '../pages/login/Login.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})