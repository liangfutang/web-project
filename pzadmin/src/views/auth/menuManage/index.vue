<template>
  <div>
    <panel-head :route="route" />

    <el-button @click="open(null)" type="primary" size="small">新增</el-button>
    
    <el-table :data="tableData.list" style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="昵称" />
      <el-table-column prop="permissionName" label="菜单权限" width="500px"/>
      <el-table-column>
        <template #default="scope">
          <el-button type="primary" @click="open(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
        <el-form-item label="权限">
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
import { ref, reactive, onMounted, nextTick } from 'vue'
import { userGetMenu, userSetMenu, menuList } from '../../../api/index'
import PanelHead from '../../../components/panelHead.vue'
import { useRoute } from 'vue-router'

onMounted(() => {
  // 获取列表数据
  getListData();
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
const route = useRoute();
const tableData = reactive({
  list: [],
  total: 0
})
const paginationData = reactive({
  pageNum:1,
  pageSize:10
})
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
         getListData()
       });
    } else {
      return false;
    }
  });
}

//请求列表数据
const getListData = () => {
  menuList(paginationData).then(({ data }) => {
      const {list,total} =data.data
      tableData.list = list
      tableData.total = total
   });
}

// 打开对话框
const open = (rowData = {}) => {
  dialogVisible.value = true;
  // 弹窗打开form生成是异步的，确保在DOM更新完成后执行回调，用于读取最新DOM状态或处理依赖DOM的逻辑
  nextTick(() => {
    if(rowData){
      Object.assign(formData, {id:rowData.id,name:rowData.name})
      treeRef.value.setCheckedKeys(rowData.permissions)
    }
  });
}
</script>

<style scoped>

</style>