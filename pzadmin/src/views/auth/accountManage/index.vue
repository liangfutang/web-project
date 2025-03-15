<template>
  <div>
    <panel-head :route="route"/>
    
    <el-table :data="tableData.list" style="width: 100%">
      <el-table-column prop="id" label="id"/>
      <el-table-column prop="name" label="昵称"/>
      <el-table-column prop="name" label="所属组别">
        <template #default="scope">
          {{ permissionNameById(scope.row.permissions_id) }}
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号"/>
      <el-table-column prop="active" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.active ? 'success' : 'danger'">{{ scope.row.active ? "正常" : "失效"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template #default="scope">
          <div class="flex-box">
            <el-icon style="margin-right: 10px"><Clock /></el-icon>
            {{ scope.row.create_time }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="open(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-info">
      <el-pagination
        size="small"
        :background="false"
        layout="total, prev, pager, next"
        :total="tableData.total"
        :page-size="paginationData.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog v-model="dialogVisible" title="编辑用户" width="500">
      <el-form
        :model="dialogForm"
        :rules="dialogFormRules"
        label-width="100px"
        label-position="left">
        <el-form-item prop="mobile" label="手机号">
          <el-input v-model="dialogForm.mobile" disabled/>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input prop="name" v-model="dialogForm.name"/>
        </el-form-item>
        <el-form-item prop="permissions_id" label="菜单权限">
          <el-select v-model="dialogForm.permissions_id" placeholder="请选择菜单权限" style="width: 240px">
            <el-option v-for="item in menuListOptions" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import { menuSelectList, authAdmin } from '../../../api/index'
import { dayjs } from 'element-plus'

onMounted(() => {
  accountListData()
  // 获取对话框的权限菜单下拉列表数据
  menuSelectList().then(({ data }) => {
    menuListOptions.value = data.data
  })
})

const route = useRoute();
const menuListOptions = ref([]);
const dialogVisible = ref(false);
const tableData = reactive({
  list: [], 
  total: 0
})
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
});
const dialogForm = reactive({
  name: "",
  permissions_id: "",
  mobile: ""
});
const dialogFormRules = reactive({
  name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  permissions_id: [{ required: true, message: '请选择权限', trigger: 'change' }],
});

const accountListData = () => {
  authAdmin(paginationData).then(({ data }) => {
    console.log(data);
    // 对时间进行格式化
    data.data.list.forEach(el => {
      el.create_time = dayjs(el.create_time).format('YYYY-MM-DD')
    });
    tableData.list = data.data.list
    tableData.total = data.data.total
  })
}
const permissionNameById = id => {
  const permission = menuListOptions.value.find(item => item.id === id)
  return permission ? permission.name : ''
}
const open = (rowData) => {
  dialogVisible.value = true;
  Object.assign(dialogForm, {name:rowData.name,permissions_id:rowData.permissions_id,mobile:rowData.mobile})
}
const handleSizeChange = (val) => {
  paginationData.pageSize = val
  accountListData()
}
const handleCurrentChange = (val) => {
  paginationData.pageNum = val
  accountListData()
}
</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
</style>