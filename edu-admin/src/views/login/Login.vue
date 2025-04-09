<template>
  <el-row>
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span>登录</span>
        </div>
      </template>
      
      <el-form :model="formData" ref="loginFormRef" :rules="rules">
        <el-form-item prop="userName">
          <el-input v-model="formData.userName" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="formData.passWord" placeholder="密码" type="password" />
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
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  passWord: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
const formData = reactive({
  userName: "",
  passWord: "",
})
const submitForm = async (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login(formData)
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
</script>

<style lang="less" scoped>

</style>