<template>
    <div>
        <nut-navbar
            :title='title'
            :fixed="true"
            :placeholder="false"
            style="background: rgba(0, 0, 0, 0);"
        >
            <template v-slot:left>
                <div class="icon-back"> 1</div>
            </template>
        </nut-navbar>
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
    

    const title = ref('表情包列表');
    const route = useRoute();
    const state = reactive({
        includeList: []
    })
    watch(() => route, (newVal, oldVal) => {
        console.log('watch router', newVal.meta.keepAlive, newVal.name, newVal.meta);
        title.value = route.meta.title;
        if (newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1) {
            state.includeList.push(newVal.name);
            console.log('-----', state.includeList);
        }
    }, {
        deep: true
    })
    
</script>
<style scoped>
.icon-back {
    width: 0.2rem;
    height: 0.2rem;
    background: #333;
}
</style>