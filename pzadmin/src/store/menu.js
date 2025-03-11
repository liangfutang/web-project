
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
    },
    // 关闭对应的tab选项，删除对应的存储
    closeTag(state, menu) {
        const index = state.selectMenu.findIndex(intem => intem.name === menu.name)
        state.selectMenu.splice(index, 1)
    }
}

export default {
    state,
    mutations
}