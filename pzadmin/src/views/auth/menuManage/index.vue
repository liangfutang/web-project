<template>
  <div>
    <el-button @click="dialogVisible = true" type="primary" size="small">新增</el-button>
    
    <el-dialog
      v-model="dialogVisible"
      title="添加权限"
      width="500"
      :before-close="handleClose"
    >
      <el-form :rules="formRules" :model="formData">
        <el-form-item prop="name" label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="权限">
          <el-tree
            style="max-width: 600px"
            show-checkbox
            :data="permissionData"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { userGetMenu } from '../../../api/index'

onMounted(() => {
  //菜单数据
  userGetMenu().then(({ data }) => {
    console.log(data);
    permissionData.value = data.data;
  });
});

const dialogVisible = ref(false)
const permissionData = ref([])

const formData = reactive({
  name: '',
})
const formRules = reactive({
  name: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
  ],
})

const handleClose = () => {
  dialogVisible.value = false
}
</script>

<style scoped>

</style>