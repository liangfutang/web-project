<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }} 111</text>
    </view>
    <button @click="handleCount">点我累加</button>
    <view class="text-area">
      <text class="title">水果总数：{{ total }}</text>
    </view>
    <view class="text-area" v-for="item in list" :key="item.name">
      <text class="title">{{ item.name }}:{{ item.value }}</text>
    </view>
    <navbar/>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref,reactive,computed } from 'vue'

onLoad(() => {
  console.log('onLoad加载')
})

const title = ref('Hello')
const list = reactive([
  {name:'橘子', value: 1},
  {name:'苹果', value: 2},
  {name:'香蕉', value: 3}
])
const total = computed(()=>{
  let sum = 0
  list.forEach(item=>{
    sum += item.value
  })
  return list.reduce((tot,cur)=>tot+cur.value, 0)
})
const handleCount = ()=>{
  list.forEach(item=>{
    item.value++
  })
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
