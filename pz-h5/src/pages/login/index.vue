<template>
    <div>
        <h1>用户登录</h1>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                v-model="loginForm.userName"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                v-model="loginForm.passWord"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>
    </div>

</template>

<script setup>
import { reactive } from 'vue';

const onSubmit = () =>{
    console.log('submit');
}
const loginForm = reactive({
    userName: '',
    passWord: ''
})
</script>

<style lang="less" scoped>
h1 {
    text-align: center;
}

</style>