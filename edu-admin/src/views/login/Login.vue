<template>
  <el-row>
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span>登录</span>
        </div>
      </template>
      
      <el-form :model="formData" ref="loginFormRef" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="formData.account" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" placeholder="密码" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submitForm(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login } from '../../api/index'

const loginFormRef = ref()
const rules = reactive({
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
const formData = reactive({
  account: "",
  password: "",
})
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      login({account:formData.account, password:formData.password}).then(({ data }) => {
        console.log(data, '登录结果');
        if (data.code === 200) {
          localStorage.setItem('edu_token', data.data.accessToken);
        } else {
          ElMessage.error(data.message);
        }
      });
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
</script>

<style lang="less" scoped>

</style>