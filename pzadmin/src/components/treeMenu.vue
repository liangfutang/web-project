<template>
    <template v-for="(item, index) in menuData">
        <el-menu-item v-if="!item.children || item.children.length === 0" 
            :key="`${parentIndex}-${item.meta.id}`" 
            :index="`${parentIndex}-${item.meta.id}`" 
            @click="handleClick(item, `${parentIndex}-${item.meta.id}`)"
        >
            <el-icon size="20">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name}}</span>
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
</template>

<script setup>
import {useRouter} from 'vue-router'

const {index:parentIndex, menuData} = defineProps(['index', 'menuData'])
const router = useRouter()

const handleClick = (item, active) => {
    router.push(item.meta.path)
    
}
</script>

<style lang="less" scoped>

</style>