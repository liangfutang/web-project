<template>
  <div>
    <panel-head :route="route" />
  </div>
</template>

<script setup>
import PanelHead from '../../../components/panelHead.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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