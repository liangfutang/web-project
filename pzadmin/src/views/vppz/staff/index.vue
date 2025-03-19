<template>
  <div>
    <panel-head :route="route" />

    <button class="btns">
      <el-button type="primary" :icon="Plus" size="small" @click="open(null)">新增</el-button>
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500" :beforeClose="beforeDialogClose">
      <el-form :model="dialogFormData" :rules="dialogFormRules" ref="dialogFormRef" label-width="100px" label-position="left">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="dialogFormData.name" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-button v-if="!dialogFormData.avatar" type="primary">上传</el-button>
          <el-image v-else style="width: 100px;height: 100px;" :src="dialogFormData.avatar" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="dialogFormData.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="dialogFormData.age" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="dialogFormData.mobile" />
        </el-form-item>
        <el-form-item label="是否生效" prop="active">
          <el-radio-group v-model="dialogFormData.active">
            <el-radio :value="0">失效</el-radio>
            <el-radio :value="1">生效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import PanelHead from '../../../components/panelHead.vue'
import { useRoute } from 'vue-router'
import { Plus, Delete, InfoFilled } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, nextTick } from 'vue'
import { dayjs } from 'element-plus'
import { companionList } from '../../../api/index.js'

onMounted(() => {
  companionTableList()
})

const route = useRoute()
// 表单中选中的
const selectTableData = ref([])
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogFormRef = ref()
const tableData = reactive({
  list: [],
  total: 0
})
//分页数据
const paginationData = reactive({
    pageNum:1,
    pageSize:10
})
const dialogFormData = reactive({
  id: "",
  name: '',
  avatar: '',
  sex: '',
  age: 28,
  mobile: '',
  active: '',
})
const dialogFormRules = reactive({
  name: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  avatar: [
    { required: true, message: '请输入头像', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  active: [
    { required: true, message: '请选择是否生效', trigger: 'blur' },
  ]
})
const beforeDialogClose = () => {
  dialogVisible.value = false
  dialogFormRef.value.resetFields()
}

const confirmEvent = () => {
  console.log('confirm')
}
const cancelEvent = () => {
  console.log('cancel')
}
const open = (rowData = {}) => {
  dialogVisible.value = true
  nextTick(() => {
    if(rowData){
      dialogTitle.value = "编辑陪护师"
      Object.assign(dialogFormData, rowData)
    } else {
      dialogTitle.value = "添加陪护师"
    }
  })
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