<template>
  <div>
    <template v-for="(item) in menuData">
        <el-menu-item v-if="!item.children || item.children.length === 0" 
            :key="`${parentIndex}-${item.meta.id}`" 
            :index="`${parentIndex}-${item.meta.id}`"
            @click="handleClick(item, `${parentIndex}-${item.meta.id}`)"
        >
            <el-icon><component :is="item.meta.icon"></component></el-icon>
            <span>{{ item.meta.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="`${parentIndex}-${item.meta.id}`" :key="item.path">
            <template #title>
                <el-icon size="20">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.name}}</span>
            </template>
            <tree-menu :index="`${parentIndex}-${item.meta.id}`" :menuData="item.children"></tree-menu>
        </el-sub-menu>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const {index: parentIndex, menuData} = defineProps(["index", "menuData"])

const handleClick = (item, index) => {
    router.push(item.meta.path)
}
</script>

<style lang="less" scoped>

</style>