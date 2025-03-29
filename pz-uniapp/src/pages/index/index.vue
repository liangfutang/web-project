<template>
  <view class="content">
    <navbar :isHome="true"/>
    <button type="primary" style="margin-top:190rpx;" @click="jumpTo">按钮</button>
  </view>
</template>

<script setup>

const jumpTo = () => {
  uni.navigateTo({
    url: '/pages/search/index'
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

</style>