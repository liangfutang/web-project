<template>
  <div>
    <el-button type="primary" @click="addUser">新增</el-button>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500"
      :before-close="beforeClose"
    >
      <el-form :model="formData" ref="formRef" :rules="rules" label-width="auto" style="max-width: 600px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { userAdd } from '../../api/index'

const formRef = ref()
const dialogVisible = ref(false)
const dialogTitle = ref('')

const formData = reactive({
  name: '',
  password: '',
  mobile: ''
})
const validateMobile = (rule, value, callback) => {
  if (!value) {
    callback(new Error('手机号不能为空'));
  } else if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('手机号格式错误'));
  }
};
const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  mobile: [
    { validator: validateMobile, required: true, trigger: ['blur'] },
  ]
})

const beforeClose = () => {
  dialogVisible.value = false
  //重置表单
  formRef.value.resetFields();
}
const addUser = () => {
  dialogTitle.value = '新增用户'
  dialogVisible.value = true
}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      // 提交表单
      userAdd({name: formData.name, password: formData.password, mobile: formData.mobile }).then(({ res }) => {
      })
    } else {
      return false
    }
  })
}
</script>

<style lang="less" scoped>

</style>