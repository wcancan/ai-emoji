<template>
  <div class="list">
    <div class="top-banner">
      <img src="" alt="">

    </div>
    <div>
      <nut-cell title="我是标题" desc="描述文字" @click="click"></nut-cell>
      <nut-popup v-model:visible="show" closeable position="bottom" style="height: 50%;">
        这里是 popup 的内容
      </nut-popup>
    </div>
  </div>
</template>

<script setup>
  import {
    ref
  } from "vue";
  const show = ref(false);
  const click = () => {
    show.value = true;
  };
</script>

<style scoped>

</style>