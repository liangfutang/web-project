<template>
  <div class="container">
    <div class="header">
        <van-icon @click="goBack" name="arrow-left" class="header-left" size="40" />
        订单详情
    </div>
    <status-bar :item="stateMap[detailData.trade_state]" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
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

const { proxy:{$api} } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const codeImg = ref('')
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