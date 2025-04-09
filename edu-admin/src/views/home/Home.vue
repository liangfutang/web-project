<template>
  <div>home页面</div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
store.commit('addMenu', {name: 'jackhome'})
console.log(store.state.menu.selectMenu)
</script>

<style lang="less" scoped>

</style>