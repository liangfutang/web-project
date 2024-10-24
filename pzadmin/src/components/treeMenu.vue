<template>
    <div>
        <template v-for="(item) in props.meuData">
            <!-- 没有子菜单 -->
            <el-menu-item 
                v-if="!item.children || item.children.length == 0"
                :key="`${props.index}-${item.meta.id}`"
                :index="`${props.index}-${item.meta.id}`"
            >
                <!-- 渲染图标和文本 -->
                <el-icon size="20">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.name }}</span>
            </el-menu-item>
            
            <!-- 还有子菜单 -->
            <el-sub-menu v-else :key="item.path" :index="`${props.index}-${item.meta.id}`">
                <template #title>
                    <el-icon size="20">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.name }}</span>
                </template>
                <!-- 递归渲染子菜单 -->
                <tree-menu :index="`${props.index}-${item.meta.id}`" :meuData="item.children"/>
            </el-sub-menu>
        </template>
    </div>
</template>

<script setup>
const props = defineProps(["index", "meuData"])
</script>

<style scoped>

</style>