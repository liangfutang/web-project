const localData = localStorage.getItem('pz_v3pz')
const state = localData ? localData.menu : () =>({
    isCollapse: false,
    selectMenu: [],
    routerList: []
})

const mutations = {
    // 控制侧边栏导航是否收放
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse;
    }, 

    // 添加一个菜单
    addMenu(state, menu) {
        if (state.selectMenu.findIndex(intem => intem.path === menu.path) === -1) {
            state.selectMenu.push(menu);
        }
    },
    // 关闭对应的tab选项，删除对应的存储
    closeTag(state, menu) {
        const index = state.selectMenu.findIndex(intem => intem.name === menu.name)
        state.selectMenu.splice(index, 1)
    },
    // 动态添加路由
    dynamicMenu(state, payload) {
        
        //通过glob导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        const routeMap = {
            '/dashboard': '/dashboard',
            '/auth/admin': '/auth/accountManage',
            '/auth/group': '/auth/menuManage',
            '/vppz/staff': '/vppz/staff',
            '/vppz/order': '/vppz/order',
        }
        
        function setRoute(routeList) {
            routeList.forEach(route => {
                if (!route.children) {
                    const url = `../views${routeMap[route.meta.path]}/index.vue`
                    route.component = modules[url]                    
                } else {
                    setRoute(route.children)
                }
                
            });
        }
        setRoute(payload)
        state.routerList = payload
    }
}

export default {
    state,
    mutations
}