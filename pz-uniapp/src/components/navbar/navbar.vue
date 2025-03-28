<template>
  <div >
    <!-- {{ name }}
    <button @click="$emit('update:name', 'new wold')">修改值</button> -->
    <slot></slot>
  </div>
</template>

<script setup>
defineProps(['name', 'age'])
</script>

<style lang="less" scoped>

</style>