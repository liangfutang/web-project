<template>
    <el-menu
        class="aside-container"
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <p class="log-lg">education</p>
        <TreeMenu :index="1" :menuData="menuData"/>
    </el-menu>
</template>

<script setup>
import { ref, reactive } from 'vue'
import TreeMenu from './treeMenu.vue'
import { useRouter} from 'vue-router'

const router = useRouter()
const menuData = reactive(router.options.routes[0].children)


const handleOpen = () => {}
const handleClose = () => {}
</script>

<style lang="less" scoped>
.aside-container {
    height: 100%;
    .log-lg {
        font-size: 20px;
        text-align: center;
        padding: 10px;
        color: #fff;
    }
}
</style>