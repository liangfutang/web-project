import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 刷新后的动态路由添加
if (localStorage.getItem('pz_token')) {
    store.commit('dynamicMenu', store.state.menu.routerList)
    store.state.menu.routerList.forEach(route => {
      router.addRoute('main', route);
    });
}

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
app.mount('#app')
