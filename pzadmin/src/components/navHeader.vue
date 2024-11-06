<template>
  <div class="header-container">
    <!-- 左侧 -->
    <div class="header-left flex-box">
      <el-icon class="menu-shrink" size="20" @click="store.commit('collapseMenu')"><Fold /></el-icon>
      
    </div>

    <!-- 右侧 -->
     <div class="header-right">
      
     </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
  height: 100%;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background-color: #fff;
  padding-right: 25px;
  .menu-shrink {
    width: 45px;
    height: 100%;
  }
  .menu-shrink:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
}
</style>