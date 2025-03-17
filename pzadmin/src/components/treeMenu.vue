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
import {useStore} from 'vuex'

const {index:parentIndex, menuData} = defineProps(['index', 'menuData'])
const router = useRouter()
const store = useStore()

const handleClick = (item, active) => {
    router.push(item.meta.path)
    // 将选中菜单放入到栈中
    store.commit('addMenu', item.meta)
    // 更新当前选中菜单
    store.commit('updateMenuActive', active)
}
</script>

<style lang="less" scoped>

</style>