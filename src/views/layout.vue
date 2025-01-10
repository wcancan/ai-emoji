<template>
    <Details v-if="route.query.page=='details'" v-model:title="title" />
    <Center v-else-if="route.query.page=='center'" v-model:title="title" />
    <List v-else />
</template>

<script setup>
    import List from "@/views/list.vue";
    import Details from "@/views/details.vue";
    import Center from "@/views/center.vue";
    import {
        ref
    } from "vue";
    import {
        useRoute,
        useRouter
    } from "vue-router";
    const route = useRoute();;
    const title = ref('');
</script>