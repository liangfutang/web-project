import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'
import Dashboard from '../views/dashboard/index.vue'
import Account from '../views/auth/accountManage/index.vue'
import Menu from '../views/auth/menuManage/index.vue'

const router = [
    {
        path:'/', 
        component: Main,
        name: 'main',
        children: [
            {
                path:'/dashboard', 
                name: '控制台',
                meta: {id: '1', name: '控制台', icon: 'Platform', path:'/dashboard', describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据'},
                component: Dashboard
            },
            {
                path:'/auth', 
                name: '权限管理',
                meta: {id: '2', name: '权限管理', icon: 'Grid', describe: '权限管理'},
                children: [
                    {
                        path:'account',
                        meta: {id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/account', describe: '管理员可以进行编辑，权限修改后需要登出才会生效'},
                        component: Account
                    },
                    {
                        path:'menu',
                        meta: {id: '2', name: '菜单管理', icon: 'Menu', path: '/auth/menu', describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取'},
                        component: Menu
                    }
                ]
            },
            {
                path:'/vppz', 
                name: 'DIDI陪诊',
                meta: {id: '3', name: 'DIDI陪诊', icon: 'BellFilled'},
                children: [
                    {
                        path:'staff',
                        meta: {id: '1', name: '陪护管理', icon: 'Checked', path: '/vppz/staff', describe: '陪护师可以进行创建和修改，设置对应生效状态控制C端选择'},
                        component: Account
                    },
                    {
                        path:'order',
                        meta: {id: '2', name: '订单管理', icon: 'List', path: '/vppz/order', describe: 'C端下单后可以查看所有订单状态，已支付的订单可以完成陪护状态修改'},
                        component: Menu
                    }
                ]
            }
        ] 
    },
    {path:'/login', component:Login},
    {path:'/home', component:Home}
]

export default createRouter({
    history: createWebHashHistory(),
    routes: router,
  })