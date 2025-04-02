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
    <!-- 轮播图 -->
		<view v-if="slides && slides.length > 0" class="index-swiper">
			<swiper autoplay circular :interval="4000" :duration="500">
				<block v-for="(item,index) in slides" :key="index">
					<swiper-item>
						<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
    <!-- 		两个快捷入口 -->
		<view v-if="nav2s && nav2s.length > 0 " class="nav2-list">
      <block v-for="(item,index) in nav2s" :key="index">
        <view class="nav2-item" @click="onNav2Tap" :data-index="index" >
          <view class="nav2-pic">
            <image :src="item.pic_image_url" mode="widthFix"></image>
          </view>
        </view>
      </block>
		</view>
    <!-- 		五个快捷入口 -->
		<view v-if="navs && navs.length > 0 " class="nav-list">
			<block v-for="(item,index) in navs" :key="index">
				<view class="nav-item" @click="onNavTap" :data-index="index">
					<view class="nav-pic"><image :src="item.pic_image_url"></image></view>
					<view class="nav-text" :style="'color:'+(item.color ? item.color : '')">{{item.title}}</view>
				</view>
			</block>
		</view>
    <!-- 医院列表 -->
		<view class="weui-cells hosp-list">
			<view class="weui-cell hosp-item weui-cell_access" v-for="(item) in hospitals" :key="item.id" :data-hid="item.id" @click="toHospitals">
				<view class="weui-cell_hd">
					<image class="hosp-avatar" :src="item.avatar_url ? item.avatar_url : '../../static/resource/images/avatar.jpg'" mode="aspectFill"></image>
				</view>
				<view class="weui-cell_bd">
					<view >
						<text class="hosp-name">{{item.name}}</text>
					</view>
					<view class="hosp-line">
						<text class="hosp-rank">{{item.rank}}</text>
						<text class="hosp-label">{{item.label}}</text>
					</view>
					<view class="hosp-line">
						<text class="hosp-intro">{{item.intro}}</text>
					</view>
				</view>
			</view>
		</view>
  </view>
</template>

<script setup>
import { ref, toRaw } from 'vue'
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
            nav2s.value = data.nav2s
						navs.value = data.navs
            hospitals.value = data.hospitals
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
//快捷入口2
const nav2s =ref([])
//快捷入口多个
const navs = ref([])
// 医院列表
const hospitals = ref([])

const setNavSize = () => {
  const windowInfo = uni.getWindowInfo();
  const deviceInfo = uni.getDeviceInfo();

  // 设置状态栏高度
  status.value = windowInfo.statusBarHeight * 2;
  // 判断系统类型并设置导航栏高度
  const system = deviceInfo.system; // 获取设备系统信息
  navHeight.value = system.indexOf('iOS') !== -1 ? 88 : 96; // iOS 和 Android 的导航栏高度不同
}

const onNav2Tap = (e) => {
  const nav =	toRaw(nav2s.value)[e.currentTarget.dataset.index]
	jump(nav,'nav2')
}
const onNavTap = (e) => {
	const nav =	toRaw(navs.value)[e.currentTarget.dataset.index]
	jump(nav,'navs')
}
const toHospitals =(e) =>{
	uni.navigateTo({
		url:'../hospital/index?hid=' + e.currentTarget.dataset.hid
	})
}
const jump = (nav,type) =>{
	//判断是否为内部链接
	if(nav.stype  == 1){
		uni.navigateTo({
			url:nav.stype_link
		})
	}
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
  .nav2-list {
    margin: 10rpx 20rpx 0 20rpx;
    .nav2-item {
      float: left;
      margin-top: 20rpx;
      width: 50%;
      text-align: center;
      box-sizing: border-box;
      padding: 0 5rpx;
      .nav2-pic {
        width: 100%;
      }
      .nav2-pic image {
        display: block;
        width: 100%;
      }
    }
  }
  .nav2-list::after {
    content: '';
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .nav-list {
    .nav-item {
      float: left;
      margin-top: 20rpx;
      width: 20%;
      text-align: center;
      padding: 10rpx 0;
      .nav-text {
        font-size: 24rpx;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .nav-list::after {
    content: '';
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .nav-pic image {
      display: block;
      margin: 0 auto;
      width: 110rpx;
      height: 110rpx;
  }
  .hosp-list {
    margin: 10rpx 0 0 0;
    background: none;
    .hosp-item {
      -webkit-box-align: stretch;
      -webkit-align-items: stretch;
      align-items: stretch;
      padding: 20rpx;
      margin: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
      .hosp-avatar {
        display: block;
        width: 200rpx;
        height: 180rpx;
        border-radius: 10rpx;
        overflow: hidden;
        margin-right: 20rpx;
      }
      .hosp-name {
        font-weight: bold;
        font-size: 34rpx;  
      }
      .hosp-line {
        margin-top: 5rpx;
        .hosp-rank {
          font-weight: bold;
          color: #0bb585;
          margin-right: 15rpx;
        }
        .hosp-label {
          font-weight: bold;
          color: #0ca7ae;
          margin-right: 15rpx;
        }
        .hosp-intro {
          color: #999999;
        }
      }
      .hosp-line text {
        font-size: 26rpx;
      }
    }
    .hosp-item::before {
        display: none;
    }
    .hosp-item::after {
        display: none;
    }
  }
  .hosp-list::before {
      display: none;
  }
  .hosp-list::after {
      display: none;
  }
}
</style>
