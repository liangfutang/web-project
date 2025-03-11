
const state = () =>({
    isCollapse: false,
    selectMenu: []
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
    }
}

export default {
    state,
    mutations
}