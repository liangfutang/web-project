<template>
  <view class="nav">
    <view :style="'height:' + status + 'rpx;' + containerStyle"></view>
    <view class="navbar" :style="{height:navHeight + 'rpx', lineHeight:navHeight + 'rpx', paddingLeft:'20rpx', containerStyle}">
      <view class="back-icon" @click="backOrHome">
        <image v-if="pages > 1" src="../../static/navbar/ic_back.png" />
        <image v-else src="../../static/navbar/ic_home.png" />
      </view>
      <view class="nav-title" v-if="titleText">
        <view :style="{height:navHeight + 'rpx', lineHeight:navHeight + 'rpx', textStyle}">{{ titleText }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref,reactive,onBeforeMount } from 'vue'

onBeforeMount(() => {
  setNavSize()
  setStyle()
})

// 状态栏高度
const status = ref(0)
// 内容高度
const navHeight = ref(0)
// 背景颜色
const containerStyle = ref('')
// 字体样式
const textStyle = ref('')
// 图标的样式
const iconStyle = ref('')
// 当前页数
const pages = ref(getCurrentPages().length)
const titleText = ref('')
// 接收父组件传参
const props = defineProps({
        background: {
          type: String,
          default: 'rgba(255, 255, 255, 1)'
        },
        color: {
          type: String,
          default: 'rgba(0, 0, 0, 1)'
        },
        fontSize: {
          type: String,
          default: '32'
        },
        iconWidth: {
          type: String,
          default: '116'
        },
        iconHeight: {
          type: String,
          default: '38'
        },
        titleText: {
          type: String,
          default: ''
        },
        isHome: {
          type: Boolean,
          default: false
        }
		})
// 计算状态栏高度
const setNavSize = () => {
  const windowInfo = uni.getWindowInfo();
  const deviceInfo = uni.getDeviceInfo();

  // 设置状态栏高度
  status.value = windowInfo.statusBarHeight * 2;
  // 判断系统类型并设置导航栏高度
  const system = deviceInfo.system; // 获取设备系统信息
  navHeight.value = system.indexOf('iOS') !== -1 ? 88 : 96; // iOS 和 Android 的导航栏高度不同
  titleText.value = props.titleText
}
// 样式设置
const setStyle = () => {
  containerStyle.value = ['background:' + props.background].join(';')
  textStyle.value = ['color:' + props.color, 'font-size:' + props.fontSize + 'rpx'].join(';')
  iconStyle.value = ['width:' + props.iconWidth + 'rpx', 'height:' + props.iconHeight + 'rpx'].join(';')
}
const backOrHome = () => {
  if (pages.value > 1) {
    uni.navigateBack({
      delta: 1
    })
  } else {
    uni.reLaunch({
      url: '/pages/index/index'
    })
  }
}
</script>

<style lang="less" scoped>
.nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  .navbar {
    position: relative;
    .back-icon {
      display: flex;
      align-items: center;
      width: 64rpx;
      height: 100%;
      margin-left: 20rpx;
      image {
        width: 64rpx;
		    height: 64rpx;
      }
    }
    .nav-title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
</style>
