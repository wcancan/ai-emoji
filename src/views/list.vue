<template>
  <nut-navbar :title='title' :fixed="false"></nut-navbar>
  <div></div>
  <router-view></router-view>
  <Card />
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";
import { useRoute } from "vue-router";
import Card from '@/components/Card.vue';


const title = ref('首页');
const route = useRoute();

const handler = () => {
  title.value = route.meta.title;
}
onUpdated(handler);
onMounted(handler);




</script>

<style scoped></style>
