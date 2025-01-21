<template>
    <div class="page-wrap">
        <div class="page-top">
            <nut-navbar :title='title || route.query.title' :fixed="false" :placeholder="true"
                @click-back="handleGoBack">
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
    import {
        amberTrack
    } from '@/Composables/amber.js'
    import backUrl from '@/config/urlConfig.js'
    
    const title = ref('');
    
    const route = useRoute();
    const router = useRouter();
    if (route.query.page != 'center' || route.query.page != 'details') {
        title.value = 'AI表情'
    }
    const handleGoBack = () => {
        const page = route.query.page
        if (page == 'details') {
            router.push({
                path: route.path,
                query: {
                    page: 'list'
                }
            })
        } else if (page == 'center') {
            router.go(-1)
        } else {
            router.go(-1)
            // window.location.href = backUrl.homeUrl
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

    .page-scroll {
        overflow: auto;
    }

    .icon-back {
        width: 0.32rem;
        height: 0.32rem;
        background: url("./assets/img/ic_back.png");
        background-size: 100% 100%;
    }
</style>