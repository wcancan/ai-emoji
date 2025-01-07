<template>
  <div class="list-emoji">
    <nut-infinite-loading v-model="infinityValue" load-txt="Loading..." load-more-txt="End~" :has-more="hasMore"
      @load-more="loadMore">
      <div class="list flex flex-between flex-wrap">
        <div class="item" v-for="(item, index) in emojiList" :key="index">
          <div class="avatar">
            <img :src="item.coverUrl" alt="">
          </div>
          <div class="title txt-c">{{item.groupName}}</div>
          <div class="btnDetail txt-c" @click="go(item)"></div>
        </div>
      </div>
    </nut-infinite-loading>
  </div>
</template>

<script setup>
  import {
    ref,
    onUpdated,
    onMounted
  } from "vue";
  import {
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
  const router = useRouter();
  const emojiList = ref([]);

  // 翻页
  const cycle = ref(0)
  const tabsValue = ref(0)
  const sum = ref(24)
  const infinityValue = ref(false)
  const hasMore = ref(true)

  let params = ref({
    pageNo:1,
    pageSize: 10,
    configureId: 'a1873951098552291329'
  })

  const loadMore = (done) => {
    params.value.pageNo = params.value.pageNo + 1
    // getList(params)
  }
  
  
  const getList = async (params) => {
    const resp = await getEmojiList(params.value)
    
    if (resp.code == 200 && resp.data) {
      emojiList.value = resp.data.list
      emojiList.value = emojiList.value.concat(resp.data.list);
      console.log(emojiList.value)
      hasMore.value = resp.data.hasNextPage
      loading.value = false;
    }
  }
  getList(params)

  function go(item) {
    amberTrack('page_click', {
      ...amberParams,
      element_id: item.templateId,
      element_name: item.templateName,
      element_type: '3',
      is_leaved: '1'
    })
    console.log(item)
    router.push({
      path: `/details`,
      query: {
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
        stay_time: end_time- start_time,
        end_time: start_time,
        operation_type: 2, // 1进入，2离开
      })
    }
    sessionStorage.removeItem('start_time')
    next()
  })
</script>
