<template>
  <div class="list-emoji">
    <nut-infinite-loading v-model="infinityValue" load-txt="Loading..." :has-more="hasMore" @load-more="loadMore">
      <div class="list flex flex-between flex-wrap">
        <div class="item" v-for="(item, index) in emojiList" :key="index">
          <div class="avatar">
            <img :src="item.coverUrl" alt="" @click="go(item)">
          </div>
          <div class="title txt-c">{{item.templateName}}</div>
          <div class="btnDetail txt-c" @click="go(item)"></div>
        </div>
      </div>
      <template #finished>
        <div class="w-full text-a63 flex flex-center "><span
            class="w-60 h-1 bg-a63 mr-16"></span>已经到底啦，但好运没有上限<span
            class="w-60 h-1 bg-a63 ml-16"></span>
        </div>
      </template>

    </nut-infinite-loading>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from "vue";
  import {
    useRoute,
    useRouter,
    onBeforeRouteLeave
  } from "vue-router";
  import {
    getEmojiList,

  } from "@/api/api";
  import {
    amberTrack
  } from '@/Composables/amber.js'

  const amberParams = {
    page_id: 'list',
    page_name: '/list'
  }

  const loading = ref(true);
  const route = useRoute()
  const router = useRouter();
  const emojiList = ref([]);

  // 翻页
  const infinityValue = ref(false)
  const hasMore = ref(true)
  let activity = sessionStorage.getItem("activity") ? JSON.parse(sessionStorage.getItem("activity")) : {}
  let params = ref({
    pageNo: 1,
    pageSize: 10,
    configureId: activity.configureId
  })

  const loadMore = () => {
    params.value.pageNo = params.value.pageNo + 1
    getList(params)
  }


  const getList = async (params) => {
    const resp = await getEmojiList(params.value)

    if (resp.code == 200 && resp.data) {
      // emojiList.value = resp.data.list
      if (resp.data.list && resp.data.list) {
        resp.data.list.forEach(item => {
          emojiList.value.push(item)
        });
      }
      // emojiList.value = emojiList.value.concat(resp.data.list);
      hasMore.value = resp.data.hasNextPage
      infinityValue.value = resp.data.hasNextPage
      loading.value = false;
    }
  }
  onMounted(() => {
    getList(params)
  })

  function go(item) {
    amberTrack('page_click', {
      ...amberParams,
      element_id: item.templateId,
      element_name: item.templateName,
      element_type: '3',
      is_leaved: '1'
    })
    router.push({
      query: {
        page: "details",
        id: item.templateId,
        title: item.templateName
      }

    })
  }
  onBeforeRouteLeave((to, from, next) => {
    const start_time = sessionStorage.getItem('start_time')
    const end_time = new Date().getTime()
    if (start_time && Number(start_time)) {
      amberTrack('page_view', {
        ...amberParams,
        stay_time: (end_time - start_time)/1000,
        end_time: start_time,
        operation_type: 2, // 1进入，2离开
      })
    }
    sessionStorage.removeItem('start_time')
    next()
  })
</script>

