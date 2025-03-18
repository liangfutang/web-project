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
  </div>
</template>

<script setup>
import PanelHead from '../../../components/panelHead.vue'
import { useRoute } from 'vue-router'
import { Plus, Delete, InfoFilled } from '@element-plus/icons-vue'

const route = useRoute()

const confirmEvent = () => {
  console.log('confirm')
}
const cancelEvent = () => {
  console.log('cancel')
}
</script>

<style lang="less" scoped>
.btns {
  padding: 10px 0 10px 10px;
  border: 0px;
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