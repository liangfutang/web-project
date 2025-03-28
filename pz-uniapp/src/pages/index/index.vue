<template>
  <view class="nav">
    <view :style="'height:' + status + 'rpx;'"></view>
    <view :style="{height:navHeight + 'rpx'}"></view>
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
}
// 样式设置
const setStyle = () => {
  containerStyle.value = ['background:' + props.background].join(';')
  textStyle.value = ['color:' + props.color, 'font-size:' + props.fontSize + 'rpx'].join(';')
  iconStyle.value = ['width:' + props.iconWidth + 'rpx', 'height:' + props.iconHeight + 'rpx'].join(';')
}
</script>

<style lang="less" scoped>
.nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
