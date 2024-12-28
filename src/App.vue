<template>
    <div>
        <nut-navbar :title='title' :fixed="true"></nut-navbar>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
    import {
        ref,
        reactive,
        watch,
        onMounted
    } from "vue";
    import {
        useRoute
    } from "vue-router";
    import {
        AutoSize
    } from "@/config/AutoSize";

    const title = ref('表情包列表');
    const route = useRoute();
    const state = reactive({
        includeList: []
    })
    watch(() => route, (newVal, oldVal) => {
        console.log(newVal.meta.keepAlive, newVal.name);
        title.value = route.meta.title;
        if (newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1) {
            state.includeList.push(newVal.name);
            console.log(state.includeList);
        }
    }, {
        deep: true
    })
    onMounted(() => {
        AutoSize()
    })
</script>
<style scoped></style>