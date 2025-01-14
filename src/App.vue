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

    const title = ref('');
    
    const route = useRoute();
    const router = useRouter();
    if (route.query.page != 'center' || route.query.page != 'details') {
        title.value = 'AI表情'
    }
    const handleGoBack = () => {
        if (route.meta.isExternal) {
            window.location.href = route.meta.backUrl
            const start_time = sessionStorage.getItem('start_time')
            const end_time = Math.floor(new Date().getTime() / 1000);
            if (start_time && Number(start_time)) {
                const route = useRoute()
                amberTrack('page_view', {
                    page_id: route.query.page,
                    page_name: '/' + route.query.page,
                    stay_time: (end_time - start_time) + "",
                    end_time: start_time,
                    operation_type: 2, // 1进入，2离开
                })
            }
            sessionStorage.removeItem('start_time')
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