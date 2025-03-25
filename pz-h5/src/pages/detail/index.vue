<template>
  <div class="container">
    <div class="header">
        <van-icon @click="goBack" name="arrow-left" class="header-left" size="40" />
        订单详情
    </div>
    <status-bar :item="stateMap[detailData.trade_state]" />

    <div class="tips">
        <!-- 待支付状态 -->
        <div class="dzf" v-if="detailData.trade_state === '待支付'">
            <div class="text1">订单待支付</div>
            <div class="text2">请在
                <counter :second="second" />内完成支付，超时未支付将自动取消订单。
            </div>
            <div class="text3">
                <van-button type="success" @click="showCode = true">立即支付({{ detailData.price }}元)</van-button>
            </div>
        </div>
        <!-- 待服务状态 -->
        <div class="dzf" v-if="detailData.trade_state === '待服务'">
            <div class="text1">正在为您安排服务专员...</div>
            <div class="text2">请保持手机畅通，稍后将有服务专员与您联系</div>
        </div>
        <!-- 已完成状态 -->
        <div class="dzf" v-if="detailData.trade_state === '已完成'">
            <div class="text1">服务已完成</div>
            <div class="text2">感谢您的使用，如有售后问题请联系客服</div>
        </div>
        <!-- 已取消状态 -->
        <div class="dzf" v-if="detailData.trade_state === '已取消'">
            <div class="text1">订单已取消</div>
            <div class="text2">期待下次为您服务，如需帮助可咨询客服</div>
        </div>
    </div>

    <!-- 支付二维码弹窗 -->
    <van-dialog :show-confirm-button="false" v-model:show="showCode">
        <van-icon name="cross" class="close" @click="closeCode" />
        <div>微信支付</div>
        <!-- <van-image width="150" height="150" :src="codeImg" /> -->
        <van-image width="150" height="150" :src="codeImg" />
        <div>请使用本人微信扫码支付</div>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Qrcode from 'qrcode'

onMounted(async () => {
    const { data } = await $api.orderDetail({ oid: route.query.oid })
    Object.assign(detailData, data.data)
    Qrcode.toDataURL(data.data.code_url).then((url) => {
        codeImg.value = url
    })
    console.log(detailData);
})
const second = computed(() => {
    // 订单开始时间+2小时-当前时间
    return detailData.order_start_time ? detailData.order_start_time + 7200000 - Date.now() : 0
})

const { proxy:{$api} } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const codeImg = ref('')
const showCode = ref(false)
const detailData = reactive({})
const stateMap = {
    '待支付': 10,
    '待服务': 20,
    '已完成': 30,
    '已取消': 40,
}

const goBack = () => {
    router.go(-1)
}
const closeCode = () => {
    showCode.value = false
    router.push('/order')
}
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

    .header-left {
        float: left;
    }
}

.card {
    margin: 15px 0;
    padding: 10px;

    .header-text {
        padding-left: 5px;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        border-left: 4px solid red;
    }
}

.dzf {
    padding: 20px;

    .text1 {
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
        color: #666;
    }

    .text2 {
        font-size: 14px;
        color: #666;
    }

    .text3 {
        text-align: center;

        .van-button {
            margin-top: 10px;
            margin-left: 10px;
            width: 80%;
            font-weight: bold;
        }
    }
}

::v-deep(.van-dialog__content) {
    text-align: center;
    padding: 20px;

    .close {
        position: absolute;
        left: 20px;
    }
}
</style>