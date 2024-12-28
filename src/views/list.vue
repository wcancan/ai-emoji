<template>
  <div class="list-emoji">

  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";
import { useRoute } from "vue-router";


const title = ref('首页');
const route = useRoute();

const handler = () => {
  title.value = route.meta.title;
}
onUpdated(handler);
onMounted(handler);




</script>

<style scoped>
  .list-emoji {

  }
</style>
