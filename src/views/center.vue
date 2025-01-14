<template>
  <div class="list-center-page no-scrollbar">
    <div class="top">
      <div class="top-con">
        <div class="top-con-mask">
          <img :src="previewEmojiData.gifUrl" alt="" style="opacity: 0;">
          <div class="title txt-c">{{previewEmojiData.templateName || previewEmojiData.fileName}}</div>
        </div>
        <div class="banner">
          <img :src="previewEmojiData.webpUrl || previewEmojiData.coverUrl" alt="">
        </div>
      </div>
      <div class="tips txt-c"><i></i>长按或截图保存<i class="tips-r"></i></div>
    </div>
    <div class="list no-scrollbar ">
      <div class="item-container" :class="{'selected': previewEmojiData.id == item.id}"
        v-for="(item, index) in emojiList" :key="index">
        <div class="item-box" @click="handlePreview(item)">
          <div class="avatar">
            <img :class="{'filter': item.status != 2 }" :src="item.webpUrl" />
            <img v-if="item.status == 2" class="opa-img"  :src="item.gifUrl" />
            <div class="opa flex-align-end flex-center f12 col-white " v-if="item.status != 2">
              <p class="re-btn" v-if="item.status == 3" @click="handleGenerate(item)"><span>重新生成</span></p>
              <div class="flex flex-center re-text" v-if="item.status == 1">
                <IconFont :name="iconLoading" class="nut-icon-am-rotate nut-icon-am-infinite"></IconFont>
                <span>{{item.statusDesc}}</span>
              </div>
              <div class="flex flex-center re-text" v-if="item.status == 3">
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
    onMounted,
    onBeforeUnmount
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
    page_id: 'center',
    page_name: '/center'
  }
  const templateInfo = ref({})
  const pageTitle = defineModel('title')
  const router = useRouter();
  const route = useRoute();
  const previewEmojiData = ref({})
  const emojiList = ref([]);
  const isDialogVisible = ref(false);
  const isHandleGenerate = ref(false)

  const handleGenerate = (item) => {
    isHandleGenerate.value = false
    if (isHandleGenerate) {
      isDialogVisible.value = true;
    } else {
      const toast = showToast.text('已重新生成', {
        cover: true,
      })
    }
    amberTrack('page_click', {
      ...amberParams,
      element_id: 'generateBtn',
      element_name: 'generateBtn',
      element_type: '3'
    })
  }

  const handlePreview = (item) => {
    if (item.status == 2) {
      previewEmojiData.value = item
      amberTrack('page_click', {
        ...amberParams,
        element_id: item.fileId,
        element_name: 'preview' + item.fileName,
        element_type: "8"
      })
      amberTrack('poster_emoji_view', {
        ...amberParams,
        emoji_name: pageTitle.value,
        emoji_id: templateInfo.value.templateId,
        expression_name: item.fileName,
        expression_id: item.fileId,
        operation_type: 1
      })
    }
  }

  let retryId = "";
  pageTitle.value = ""
  emojiList.value = [];
  const getCenterList = async () => {
    const resp = await getMyEmoticon({
      mergeId: route.query.mergeId || ""
    });
    //status1 生成中 2生成成功 3生成失败 0已删除
    if (resp.code == 200 && resp.data) {
      let filesList = [];
      let list = [];
      let isFresh = false;
      resp.data.files.forEach(item => {
        if (item.status != 0) {
          filesList.push(item)
        }
        if (item.status == 2) {
          list.push(item)
        } else if (item.status == 1) {
          isFresh = true;
        }
      });
      emojiList.value = filesList;
      previewEmojiData.value = list.length > 0 ? list[0] : resp.data.templateInfo
      retryId = resp.data.taskId
      pageTitle.value = resp.data.templateInfo.templateName
      templateInfo.value = resp.data.templateInfo
      if (isFresh) {
        setTimeout(() => {
          getCenterList();
        }, 10000);
      }
    }
    console.log(templateInfo.value.templateName)
    amberTrack('poster_emoji_view', {
      ...amberParams,
      emoji_name: templateInfo.value.templateName,
      emoji_id: templateInfo.value.templateId,
      expression_name: previewEmojiData.value.fileName || pageTitle.value,
      expression_id: previewEmojiData.value.fileId || templateInfo.value.templateId,
      operation_type: 1
    })
  };

  const toRetryTask = async () => {
    const resp = await retryTask({
      taskId: retryId
    });
    if (resp.code == 200) {
      isHandleGenerate.value = true
      getCenterList();
    }
    isDialogVisible.value = false
    amberTrack('page_click', {
      ...amberParams,
      element_id: templateInfo.value.templateId,
      element_name: 'retryTask' + pageTitle.value,
      element_type: '3'
    })
  };

  onMounted(() => {
    emojiList.value = [];
    getCenterList()
  })
  const handlePageLeave = () => {
    const start_time = sessionStorage.getItem('center_start_time')
    const end_time = Math.floor(new Date().getTime() / 1000);
    if (start_time && Number(start_time)) {
      amberTrack('page_view', {
        ...amberParams,
        stay_time: (end_time - start_time) + "",
        end_time: end_time,
        operation_type: 2, // 1进入，2离开
      })
    }
    sessionStorage.removeItem('center_start_time')
  }
  onBeforeUnmount(handlePageLeave);
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
    scrollbar-width: thin;
  }
  .item-container {
    flex: 0 0 31.5%;
  }
</style>