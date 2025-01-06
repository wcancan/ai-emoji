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
    useRouter
  } from "vue-router";
  import {
    getEmojiList,
    getActivityDetail
  } from "@/api/api";

  const loading = ref(true);
  const router = useRouter();
  const emojiList = ref([]);

  // 翻页
  const cycle = ref(0)
  const tabsValue = ref(0)
  const sum = ref(24)
  const infinityValue = ref(false)
  const hasMore = ref(true)

  const loadMore = (done) => {
    // setTimeout(() => {
    //   emojiData.value.push({
    //   id: 2,
    //   name: '表情包合集1',
    //   avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    // },{
    //   id: 2,
    //   name: '表情包合集1',
    //   avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    // })
    //   cycle.value++
    //   if (cycle.value > 2) hasMore.value = false
    //   infinityValue.value = false
    // }, 1000)
  }
  
  const getActivityDetails = async () => {
    const resp1 = await getActivityDetail({
      activityId: 'test'
    })
    console.log(resp1, '1111')
  }
  getActivityDetails()

  const getList = async () => {
    const resp = await getEmojiList({
      configureId: 'a1873951098552291329'
    })
    console.log(resp, '1111')
    if (resp.code == 200 && resp.data && resp.data.length) {
      emojiList.value = resp.data[0].materialList;
      // emojiData.value = [{
      //   templateId: 1,
      //   templateName: '表情包合集1',
      //   coverUrl: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
      //   videoUrl: '',
      //   templateMark: 0,
      //   templatePrice: 1
      // }]
      loading.value = false;
    }
  }
  getList()

  function go(item) {
    router.push({
      path: `/details`,
      query: {
        id: item.templateId
      },
      meta: {
        title: item.templateId
      }
    })
  }
</script>
