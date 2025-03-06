import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'

const router = [
    {path:'/login', component:Login},
    {path:'/home', component:Home}
]

export default createRouter({
    history: createWebHashHistory(),
    routes: router,
  })