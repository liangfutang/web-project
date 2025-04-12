import { createWebHashHistory, createRouter } from 'vue-router'

import Login from '../views/login/Login.vue'
import Internaluser from '../views/internaluser/User.vue'
import Externaluser from '../views/externaluser/User.vue'
import Home from '../views/home/Home.vue'
import Main from '../views/Main.vue'

const routes = [
  { 
    path: '/', 
    component: Main,
    children: [
      { 
        path: '/home', 
        component: Home, 
        name: 'home', 
        meta:{id: '1', name: '控制台', icon: 'Platform', path:'/home', describe: '首页'},
      },
      { 
        path: '/user', 
        name: 'user', 
        meta:{id: '2', name: '用户管理', icon: 'User', path:'/user', describe: '用户管理'},  
        children: [
          { 
            path: '/internaluser', 
            component: Internaluser, 
            meta:{id: '1', name: '内部用户', icon: 'UserFilled', path:'/internaluser', describe: '内部用户管理'},
          },
          { 
            path: '/externaluser', 
            component: Externaluser, 
            meta:{id: '2', name: '外部用户', icon: 'Avatar', path:'/externaluser', describe: '外部用户管理'}
          }
        ]
      },
    ]
  },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
