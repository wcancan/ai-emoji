<template>
<div>
    <router-view v-slot="{ Component }">
         <div >
    <nut-cell title="我是标题" desc="描述文字" @click="click"></nut-cell>
    <nut-popup v-model:visible="show" closeable position="bottom" style="height: 50%;">
      这里是 popup 的内容
    </nut-popup>
  </div>
        <keep-alive>
            <component :is="Component" />

        </keep-alive>
    </router-view>
    </div>
</template>

<script setup>
import { ref,reactive, watch } from "vue";
import { useRoute } from "vue-router";
const show = ref(false);
const click = () => {
  show.value = true;
};
const route = useRoute();
const state = reactive({
    includeList: []
})
watch(() => route, (newVal, oldVal) => {
    console.log(newVal.meta.keepAlive, newVal.name);
    if (newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1) {
        state.includeList.push(newVal.name);
        console.log(state.includeList);
    }
}, { deep: true })
</script>
<style scoped></style>