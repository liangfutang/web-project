<template>
  <el-row>
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span>登录</span>
        </div>
      </template>
      
      <el-form ref="loginFormRef">
        <el-form-item label="">
          <el-input placeholder="用户名" />
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="密码" type="password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submitForm(loginFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'

const loginFormRef = ref()

const submitForm = (formRef) => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
</script>

<style lang="less" scoped>

</style>