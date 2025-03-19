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
import { reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

const { proxy: { $api } } = getCurrentInstance();
const router = useRouter();

const loginForm = reactive({
    userName: '',
    passWord: ''
})

const onSubmit = async () =>{
    console.log('submit');
    const { data } = await $api.login(loginForm);
    if (data.code === 10000) {
        localStorage.setItem('h5_token', data.data.token)
        localStorage.setItem('h5_userInfo', JSON.stringify(data.data.userInfo))
        router.push('/home')
    } else {
        alert("用户名或密码错误!")
        router.push('/login')
    }
}
</script>

<style lang="less" scoped>
h1 {
    text-align: center;
}

</style>