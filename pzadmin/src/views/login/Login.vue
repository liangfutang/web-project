<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px" >
      <template #header>
        <div class="card-header">
          <img :src="imgUrl" alt="" />
        </div>
      </template>
      <div class="jump-link">
        <el-link type="primary" @click="handleChange">{{ formType ? "返回登录" : "注册账号" }}</el-link>
      </div>

      <el-form :model="formData" style="max-width: 600px" class="demo-ruleForm" :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="userName">
          <el-input v-model="formData.userName" :prefix-icon="UserFilled" placeholder="手机号"/>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passWord">
          <el-input v-model="formData.passWord" :prefix-icon="Lock" type="password" placeholder="密码"/>
        </el-form-item>
        <!-- 校验码 -->
        <el-form-item prop="validCode">
          <el-input v-if="formType" v-model="formData.validCode" :prefix-icon="Lock" placeholder="验证码">
            <template #append>
              <span @click="countdownChange" style="cursor: pointer">
                {{ countdown.validText }}
              </span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { UserFilled, Lock } from '@element-plus/icons-vue'

const imgUrl = new URL('../../../public/login-head.png', import.meta.url)
// 切换表单，0:登录 1:注册
const formType = ref(0)
const formData = reactive({
  userName: "",
  passWord: "",
  validCode: "",
})
const handleChange = () => {
  formType.value = formType.value ? 0 : 1;
}

// 表单校验
const userNameValidator = (rule, value, callback) => {
  if (!value || !value.trim().length) {
    callback(new Error("手机号不能为空"));
  } else {
    const phoneReg =
      /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    phoneReg.test(value)
      ? callback()
      : callback(new Error("请输入正确的手机号"));
  }
}
const passWordValidator = (rule, value, callback) => {
  if (!value || !value.trim().length) {
    callback(new Error("密码不能为空"));
  } else {
    const passReg = /^[a-zA-Z0-9_-]{4,16}$/;
    passReg.test(value)
      ? callback()
      : callback(new Error("密码为4-16位数字、字母、下划线"));
  }
}
const validCodeValidator = (rule, value, callback) => {
  if (!value || !value.trim().length) {
    callback(new Error("校验码不能为空"));
  }
}
const rules = reactive({
  userName: [{validator: userNameValidator ,trigger: "blur",},],
  passWord: [{validator: passWordValidator,trigger: "blur",},],
  validCode: [{validator: validCodeValidator ,trigger: "blur",},],
})

// 获取验证码响应式对象
const countdown = reactive({
  validText: "获取验证码",
  time: 60,
})
// 点击倒计时获取验证码
let clickFlag = false; 
const countdownChange = () => {
  if (clickFlag) return;
  // 校验手机号
  const phoneReg =
    /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
  if (!formData.userName || !phoneReg.test(formData.userName)) {
    return ElMessage({
      message: "请输入正确的手机号",
      type:'warning',
    });
  }
  // 开启定时器
  let timer = setInterval(() => {
    if (countdown.time <= 0) {
      countdown.validText = "获取验证码";
      countdown.time = 60;
      clickFlag=false;
      clearInterval(timer)
    } else {
      countdown.time--;
      countdown.validText = `${countdown.time}s后重新获取`;
    }
  }, 1000);

  clickFlag = true;
  // 发送获取验证码请求
  
}
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 0;
}
.login-container {
  height: 100%;
  .card-header {
    background-color: #899fe1;
    img {
      width: 430px;
    }
  }
  .jump-link {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>