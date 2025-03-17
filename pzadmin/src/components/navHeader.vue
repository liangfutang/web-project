<template>
  <div class="header-container">
    <div class="header-left flex-box">
      <el-icon v-if="!isCollapse" class="icon" size="20" @click="store.commit('collapseMenu')"><Fold /></el-icon>
      <el-icon v-else class="icon" size="20" @click="store.commit('collapseMenu')"><Expand /></el-icon>
      <ul class="flex-box">
        <li v-for="(item, index) in selectMenu" :key="item.path" class="tab flex-box" :class="{selected: item.path === route.path}">
          <el-icon size="12"><component :is="item.icon" /></el-icon>
          <router-link :to="item.path" class="text flex-box">{{item.name}}</router-link>
          <el-icon size="12" class="close" @click="closeTag(item, index)"><Close /></el-icon>
        </li>
      </ul>
    </div>
    
    <div class="header-right">
      <el-dropdown @command="handleCommand">
        <div class="el-dropdown-link flex-box">
          <el-avatar
            :src="userAvatar"
          />
          <p class="user-name">{{ userName }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const store = useStore()
const isCollapse = computed(() =>  store.state.menu.isCollapse)
const selectMenu = computed(() => store.state.menu.selectMenu)
const route = useRoute()
const router = useRouter()
const userInfo = JSON.parse(localStorage.getItem('pz_userInfo'))
const userAvatar = userInfo.avatar
const userName = userInfo['name']

const closeTag = (item, index) => {
  // 先删除store中的该标签
  store.commit('closeTag', item)
  
  // 再根据对应的需求跳转到对应的页面
  // 如果删除的不是当前页
  if (route.path !== item.path) {
    return
  }
  // 如果删除的是当前页
  const selectMenuData = selectMenu.value
  // 最后一页  非最后一页
  if (selectMenuData.length === index) {
    if (!selectMenuData.length) {
      router.push('/')
    } else {
      router.push(selectMenuData[index - 1].path)
    }
  } else {
    router.push(selectMenuData[index].path)
  }
  
}
const handleCommand = (command) => {
  console.log(command);
  
  if (command === 'logout') {
    localStorage.removeItem('pz_token')
    localStorage.removeItem('pz_userInfo')
    localStorage.removeItem('pz_v3pz')
    window.location.href = window.location.origin
    // router.push('/login')
  }
}
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
  .header-left {
    height: 100%;
    .icon {
      width: 45px;
      height: 100%;
    }
    .icon:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
    .tab {
      padding: 0 10px;
      height: 100%;
      .text {
        margin: 0 5px;
      }
      .close {
        visibility: hidden;
      }
      &.selected{
        a{
          color: #409eff;
        }
        i{
          color: #409eff;
        }
        background-color: #f5f5f5;
      }
    }
    .tab:hover {
      background-color: #f5f5f5;
      .close{
        visibility: inherit;
        cursor: pointer;
        color: #000;
      }
    }
  }
  .header-right {
    .user-name {
      margin-left: 10px;
    }
  }
  a {
    height: 100%;
    color: #333;
    font-size: 15px;
  }
}
</style>