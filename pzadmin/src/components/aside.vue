<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <p class="log-lg">DIDI陪诊</p>
        <TreeMenu></TreeMenu>
    </el-menu>
</template>

<script setup>
import TreeMenu from './treeMenu.vue';

const handleOpen = () => {}
const handleClose = () => {}
</script>

<style lang="less" scope>
.aside-container {
  .log-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>