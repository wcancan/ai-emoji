<template>
  <div class="list-center-page">
    <div class="top">
      <div class="top-con">
        <div class="banner">
            <img :src="previewEmojiData.avatar" alt="">
        </div>
        <div class="title txt-c">{{previewEmojiData.name}}</div>
        
        </div>
        <div class="tips txt-c"><i></i>长按或截图保存<i class="tips-r"></i></div>
    </div>
    <div class="list">
        <div
            class="item-container"
            v-for="(item, index) in emojiList"
            :key="index"
        >
            <div class="item-box" @click="handlePreview(item)">
                <div class="avatar">
                    <img :class="{'filter': item.status != 0 }" :src="item.avatar" />
                    <div class="opa flex-align-end flex-center f12 col-white " v-if="item.status != 0">
                       <p class="re-btn"><span>重新生成</span></p>
                        <div class="flex flex-center" v-if="item.status == 1">
                            <Loading1 class="m-r-5" color='#fff' width="0.08rem" heigh="0.08rem" />
                            <span>生成中</span>
                        </div>
                        <div class="flex flex-center" v-if="item.status == 2" @click="handleGenerate">
                          <MaskClose class="m-r-5" color='#fff' width="0.08rem" heigh="0.08rem" />
                          <span>生成失败</span>
                        </div>
                    </div>
                </div>
                <div class="title"><span>{{item.name}}</span></div>
            </div>
        </div>
    </div>

     <nut-dialog
      v-model:visible="isDialogVisible"
    >
    <i class="close-pop"  @click="isDialogVisible= false"></i>
      <span>确认是否重新生成？</span>
      <template #footer>
        <div class="footer-btn">
          <span class="btn-cancel" @click="isDialogVisible= false"></span>
          <span class="btn-ok"  @click="isDialogVisible= false"></span>
        </div>
      </template>
    </nut-dialog>
  </div>
</template>

<script setup>
import { ref, createVNode } from "vue";
import { useRouter } from "vue-router";

import { Loading1, MaskClose } from '@nutui/icons-vue'

const router = useRouter();
const previewEmojiData = ref({})
const emojiList = ref([]);
const isDialogVisible = ref(false);

const handleGenerate = () => {
  isDialogVisible.value = true
}

const handlePreview = (item) => {
  if(item.status == 0) {
    previewEmojiData.value = item
  }
}

// 获取表情包合集数据
const getCenterList = () => {

  emojiList.value = [{
    id: 1,
    name: '表情包合集0',
    status: 0,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集1',
    status: 1,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集2',
    status: 2,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集3',
    status: 0,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集4',
    status: 1,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集5',
    status: 2,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集3',
    status: 0,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集4',
    status: 1,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集5',
    status: 2,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集3',
    status: 0,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集4',
    status: 1,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 1,
    name: '表情包合集5',
    status: 2,
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  }]
  previewEmojiData.value = emojiList.value[0]
}

function go (item) {
  router.push({
    path: `/detail/${item.id}`
  })
}
getCenterList()


// onUpdated(getCenterList);
// onMounted(getCenterList);




</script>

<style scoped lang="less">
  .list-center-page {
    display: flex;
    height: 100vh;
    width:100%;
    flex-direction: column;
    padding-top: 0.77rem;
  }
  
  .list {
    width:100%;
    flex: 1;
    overflow: scroll;
  }

</style>
