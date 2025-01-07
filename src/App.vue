<template>
    <div class="page-wrap">
        <div class="page-top">
            <nut-navbar :title='route.meta.title || title' :fixed="false" :placeholder="true" @click-back="handleGoBack">
                <template v-slot:left>
                    <div class="icon-back"></div>
                </template>
            </nut-navbar>
        </div>
        <router-view v-slot="{ Component }" class="page-scroll">
            <keep-alive>
                <component :is="Component" v-model:title="title" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
    import {
        ref
    } from "vue";
    import {
        useRoute,
        useRouter
    } from "vue-router";

    const title = ref('');
    const route = useRoute();
    const router = useRouter();
    const handleGoBack = () => {
        if (route.meta.isExternal) {
            window.location.href = route.meta.backUrl
        } else {
            router.back()
        }
    }
</script>
<style scoped>
    .page-wrap {
        overflow: hidden;
        display: flex;
        height: 100vh;
        flex-direction: column;
        background: url("/src/assets/img/bg.png") no-repeat top;
        background-size: 100% 100%;
    }
    .page-scroll{
        overflow: auto;
    }

    .icon-back {
        width: 0.32rem;
        height: 0.32rem;
        background: url("./assets/img/ic_back.png");
        background-size: 100% 100%;
    }
</style>