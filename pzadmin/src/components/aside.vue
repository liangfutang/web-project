<template>
  <el-menu
    :style="{ width: !isCollapse ? '230px' : '64px' }"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="aside-container"
    default-active="2"
    text-color="#fff"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <p class="logo-lg">{{ isCollapse ? "DIDI" : "DIDI陪诊" }}</p>
    <TreeMenu :index="1" :meuData="meuData"></TreeMenu>
  </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue';
import { useRouter } from "vue-router"
import { reactive, computed } from "vue"
import { useStore } from 'vuex' 

const store = useStore()

const router = useRouter()
const meuData = reactive(router.options.routes[0].children)
const isCollapse = computed(() => store.state.menu.isCollapse)
console.log(isCollapse);


const handleOpen = () => {}
const handleClose = () => {}
</script>

<style lang="less" scoped>
.aside-container {
    height: 100%;
    .logo-lg {
        font-size: 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
}
</style>