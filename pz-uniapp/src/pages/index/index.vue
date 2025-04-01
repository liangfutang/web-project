<template>
  <view class="content">
    <navbar :isHome="true"/>
    <!-- 推荐添加小程序 -->
    <view class="weui-cell" :style="'margin-top:' + (navHeight + status) + 'rpx;background: #fff9eb;'">
      <view class="weui-cell__hd">
        <image src="../../static/resource/images/ic_myapp.png" style="display:block;width:40rpx;height:40rpx;margin-right:14rpx;"/>
      </view>
      <view class="weui-cell__bd">
        <text style="color: #be9719;font-size: 13px;">点击右上角”添加到我的小程序“，方便下次找到</text>
      </view>
      <view class="weui-cell__ft">
        <image src="../../static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx;"/>
      </view>
    </view>
    <!-- //轮播图 -->
		<view v-if="slides && slides.length > 0" class="index-swiper">
			<swiper autoplay circular :interval="4000" :duration="500">
				<block v-for="(item,index) in slides" :key="index">
					<swiper-item>
						<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app' 
// import utils from '../../common/js/utils'

onLoad(() => {
  setNavSize()
  // utils.getUserInfo()
  app.globalData.utils.getUserInfo()
  app.globalData.utils.request({
			url:'/app/init',
			success: res =>{
				const {id} =res.data.area
				//通过id去获取当前地区的页面数据
				app.globalData.utils.request({
					url:'/Index/index',
					data:{
						aid:id
					},
					success:({data}) =>{
						slides.value = data.slides
					}
				})
			}
		})
})

const app = getApp()
// 状态栏高度
const status = ref(0)
// 内容高度
const navHeight = ref(0)
//定义轮播图数据
const slides = ref([])

const setNavSize = () => {
  const windowInfo = uni.getWindowInfo();
  const deviceInfo = uni.getDeviceInfo();

  // 设置状态栏高度
  status.value = windowInfo.statusBarHeight * 2;
  // 判断系统类型并设置导航栏高度
  const system = deviceInfo.system; // 获取设备系统信息
  navHeight.value = system.indexOf('iOS') !== -1 ? 88 : 96; // iOS 和 Android 的导航栏高度不同
}

</script>

<style lang="less" scoped>
.content {
  .index-swiper {
    padding: 20rpx 20rpx 0 20rpx;
	  overflow: hidden;
  }
  .index-swiper swiper {
    height: 320rpx;
    overflow: hidden;
    border-radius: 10rpx;
  }
  .index-swiper swiper-item image {
    width: 100%;
    height: 100%;
  }
}
</style>
