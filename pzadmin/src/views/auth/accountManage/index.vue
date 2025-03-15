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
          <el-button type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

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
const tableData = reactive({
  list: [], 
  total: 0
})
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
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
</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}
</style>