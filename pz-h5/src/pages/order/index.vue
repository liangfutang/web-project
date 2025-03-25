<template>
  <div class="container">
    <van-icon @click="goBack" name="arrow-left" class="header-left" size="40" />
    <div class="header">我的订单</div>
    <van-tabs @click-tab="onClickTab" v-model:active="active">
        <van-tab title="全部">内容 1</van-tab>
        <van-tab title="待支付">内容 2</van-tab>
        <van-tab title="待服务">内容 2</van-tab>
        <van-tab title="已完成">内容 3</van-tab>
        <van-tab title="已取消">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter} from 'vue-router'

const router = useRouter()
const active = ref("")
const goBack = () => {
    router.go(-1)
};
const onClickTab = (item) => {
    console.log(item);
};
</script>

<style lang="less" scoped>
.container {
    background-color: #f0f0f0;
    height: 100vh;
}

.header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;
}

.van-row {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;

    .text1 {
        font-size: 16px;
        line-height: 25px;
        font-weight: bold;
    }

    .text2 {
        font-size: 14px;
        line-height: 20px;
        color: #999999;
    }
}

.bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999999;
}
</style>