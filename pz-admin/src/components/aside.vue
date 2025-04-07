<template>
    <el-menu
        :style="{width: isCollapse ? '64px': '230px'}"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        :default-active="activeMenu"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <p class="log-lg">{{ isCollapse ?  "DIDI" : "DIDI陪诊"}}</p>
        <TreeMenu :index="1" :menuData="menuData"></TreeMenu>
    </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue';
import {useRouter} from 'vue-router'
import {reactive,computed} from 'vue'
import {useStore} from 'vuex'

const router = useRouter()
const store = useStore()
// const menuData = reactive(router.options.routes[0].children)
const menuData = store.state.menu.routerList

const isCollapse = computed(() =>  store.state.menu.isCollapse)
const activeMenu = computed(() => store.state.menu.menuActive)


const handleOpen = () => {}
const handleClose = () => {}
</script>


<style lang="less" scope>
.aside-container {
  transition: width 0.3s linear;
  .log-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>