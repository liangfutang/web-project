const menu = {
    state () {
      return {
        selectMenu: []
      }
    },
    mutations: {
      addMenu (state, menu) {
        state.selectMenu.push(menu)
      }
    }
  }

  export default menu
