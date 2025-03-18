<template>
  <div>
    <panel-head :route="route" />

    <button class="btns">
      <el-button type="primary" :icon="Plus" size="small">新增</el-button>
      <el-popconfirm
        confirm-button-text="是"
        cancel-button-text="否"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="是否确认删除"
        @confirm="confirmEvent"
        @cancel="cancelEvent"
      >
        <template #reference>
          <el-button type="danger" :icon="Delete" size="small">删除</el-button>
        </template>
      </el-popconfirm>
    </button>

    <el-table :data="tableData.list" style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="昵称" />
      <el-table-column prop="avatar" label="头像" >
        <template #default="scope">
          <el-image style="width: 50px;height: 50px;" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template #default="scope">
          {{ scope.row.sex === "1" ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" />
      <el-table-column prop="active" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.active ? 'success' : 'danger'">{{ scope.row.active ? "正常" : "失效" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" >
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
      
    </el-dialog>
  </div>
</template>

<script setup>
import PanelHead from '../../../components/panelHead.vue'
import { useRoute } from 'vue-router'
import { Plus, Delete, InfoFilled } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { dayjs } from 'element-plus'
import { companionList } from '../../../api/index.js'

onMounted(() => {
  companionTableList()
})

const route = useRoute()
// 表单中选中的
const selectTableData = ref([])
const tableData = reactive({
  list: [],
  total: 0
})
//分页数据
const paginationData = reactive({
    pageNum:1,
    pageSize:10
})

const confirmEvent = () => {
  console.log('confirm')
}
const cancelEvent = () => {
  console.log('cancel')
}
const open = (rowData) => {
  console.log(rowData)
}
const companionTableList = () => {
  companionList(paginationData).then(({ data }) => {
    const { list, total } = data.data
    list.forEach(item => {
      item.create_time = dayjs(item.create_time).format('YYYY-MM-DD')
    });
    tableData.list = list
    tableData.total = total
  })
}
const handleSizeChange = (val) => {
  paginationData.pageSize = val
  companionTableList()
}
const handleCurrentChange = (val) => {
  paginationData.pageNum = val
  companionTableList()
}
const handleSelectionChange = (val) => {
  selectTableData.value = val.map(item => ({ id:item.id }))
}
</script>

<style lang="less" scoped>
.btns {
  padding: 10px 0 10px 10px;
  border: 0px;
}
.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    .select {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 24px;
      height: 24px;
      background-color: #67c23a;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-image {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>