<template>
  <div class="header-container">
    <!-- 左侧 -->
    <div class="header-left flex-box">
      <el-icon class="menu-shrink" size="20" @click="store.commit('collapseMenu')"><Fold /></el-icon>
      
    </div>

    <!-- 右侧 -->
     <div class="header-right">
      <el-dropdown>
        <div class="el-dropdown-link flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <p class="user-name">jack</p>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="cancel">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
  .header-right {
    .user-name {
      margin-left: 10px;
    }
  }
}
</style>