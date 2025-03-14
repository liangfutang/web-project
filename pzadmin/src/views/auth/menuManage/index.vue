<template>
  <div>
    <el-button @click="dialogVisible = true" type="primary" size="small">新增</el-button>
    
    <el-dialog
      v-model="dialogVisible"
      title="添加权限"
      width="500"
      :before-close="beforeClose"
    >
      <el-form :rules="formRules" :model="formData" ref="formRef">
        <el-form-item prop="name" label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="权限">
          <el-tree
            ref="treeRef"
            style="max-width: 600px"
            show-checkbox
            :data="permissionData"
            node-key="id"
            :default-expanded-keys="[2]"
            :default-checked-keys="defaultCheckKeys"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { userGetMenu, userSetMenu } from '../../../api/index'

onMounted(() => {
  //菜单数据
  userGetMenu().then(({ data }) => {
    console.log(data);
    permissionData.value = data.data;
  });
});

const dialogVisible = ref(false)
const permissionData = ref([])
const defaultCheckKeys = [4, 5];
const treeRef = ref();
const formRef = ref();

const formData = reactive({
  id: '',
  name: '',
  permissions: ''
})
const formRules = reactive({
  name: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
  ],
})

const beforeClose = () => {
  // 为右上角的关闭按钮服务，否则关不了对话框
  dialogVisible.value = false;
  //重置表单
  formRef.value.resetFields();
  //tree选择重置
  treeRef.value.setCheckedKeys(defaultCheckKeys);
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      dialogVisible.value = false;
      const permissions = JSON.stringify(treeRef.value.getCheckedKeys());
      userSetMenu({ name: formData.name, permissions, id: formData.id }).then(({ data }) => {
         beforeClose()
        //  getListData()
       });
    } else {
      return false;
    }
  });
}
</script>

<style scoped>

</style>