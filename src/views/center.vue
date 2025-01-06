<template>
  <div class="list-center-page">
    <div class="top">
      <div class="top-con">
        <div class="banner">
          <img :src="previewEmojiData.coverLocalUrl || previewEmojiData.webpUrl" alt="">
        </div>
        <div class="title txt-c">{{previewEmojiData.templateName || previewEmojiData.fileName}}</div>

      </div>
      <div class="tips txt-c"><i></i>长按或截图保存<i class="tips-r"></i></div>
    </div>
    <div class="list">
      <div class="item-container " :class="{'selected': previewEmojiData.id == item.id}"
        v-for="(item, index) in emojiList" :key="index">
        <div class="item-box" @click="handlePreview(item)">
          <div class="avatar">
            <img :class="{'filter': item.status != 2 }" :src="item.webpUrl" />
            <div class="opa flex-align-end flex-center f12 col-white " v-if="item.status != 2">
              <p class="re-btn"><span>重新生成</span></p>
              <div class="flex flex-center re-text" v-if="item.status == 1">
                <IconFont :name="iconLoading" class="nut-icon-am-rotate nut-icon-am-infinite"></IconFont>
                <span>{{item.statusDesc}}</span>
              </div>
              <div class="flex flex-center re-text" v-if="item.status == 3" @click="handleGenerate(item)">
                <IconFont :name="iconError"></IconFont>
                <span>{{item.statusDesc}}</span>
              </div>
            </div>
          </div>
          <div class="title"><span>{{item.fileName}}</span></div>
        </div>
      </div>
    </div>

    <nut-dialog v-model:visible="isDialogVisible">
      <i class="close-pop" @click="isDialogVisible= false"></i>
      <span>生成失败的表情即将全部重新生成？</span>
      <template #footer>
        <div class="footer-btn">
          <span class="btn-cancel" @click="isDialogVisible= false"></span>
          <span class="btn-ok" @click="toRetryTask()"></span>
        </div>
      </template>
    </nut-dialog>
  </div>
</template>

<script setup>
  import {
    ref,
    createVNode
  } from "vue";
  import {
    useRouter,
    useRoute,
    onBeforeRouteLeave
  } from "vue-router";
  import {
    IconFont,
    Loading1,
    MaskClose
  } from '@nutui/icons-vue'
  import iconLoading from '@/assets/img/icon_loading.png';
  import iconError from '@/assets/img/icon_error.png';
  import {
    amberTrack
  } from '@/Composables/amber.js'

  import {
    getMyEmoticon,
    retryTask
  } from "@/api/api.js";

  const amberParams = {
    page_id: 'list',
    page_name: '/list'
  }
  const pageTitle = defineModel('title')
  const router = useRouter();
  const route = useRoute();
  const previewEmojiData = ref({})
  const emojiList = ref([]);
  const isDialogVisible = ref(false);

  const handleGenerate = (item) => {
    isDialogVisible.value = true;
  }

  const handlePreview = (item) => {
    previewEmojiData.value = item
    if (item.status == 0) {
      previewEmojiData.value = item
    }
  }

  function go(item) {
    router.push({
      path: `/details`,
      query: {
        id: item.id
      }
    })
  }

  let retryId = "";
  const getCenterList = async () => {
    const resp = await getMyEmoticon({
      mergeId: route.query.mergeId || ""
    });
    //status1 生成中 2生成成功 3生成失败 0已删除
    if (resp.code == 200 && resp.data) {
      console.log(resp.data)
      emojiList.value = resp.data.files.filter((item) => item.status != 0);
      previewEmojiData.value = resp.data.templateInfo
      retryId = resp.data.taskId || "11-a7049a8b-7d28-49b1-9961-49736ef26e09"
      pageTitle.value = resp.data.templateInfo.templateName
    }
  };

  const toRetryTask = async () => {
    const resp = await retryTask({
      taskId: retryId
    });
    if (resp.code == 200) {
      getCenterList();
    }
    isDialogVisible.value = false
  };

  getCenterList()
  onBeforeRouteLeave((to, from, next) => {
    const start_time = sessionStorage.getItem('start_time', start_time)
    const end_time = new Date().getTime()
    if (start_time && Number(start_time)) {
      amberTrack('page_view', {
        ...amberParams,
        stay_time: end_time- start_time,
        end_time: start_time,
        operation_type: 2, // 1进入，2离开
      })
    }
    sessionStorage.getItem('start_time', start_time)
  })
</script>

<style scoped lang="less">
  .list-center-page {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-top: 0.02rem;
  }

  .list {
    width: 100%;
    flex: 1;
    overflow: scroll;
  }
</style>