<template>
  <div class="list-emoji">
    <div class="list flex flex-between flex-wrap">
      <div
        class="item"
        v-for="(item, index) in emojiList"
        :key="index"
      >
        <div class="avatar">
          <img :src="item.avatar" alt="">
        </div>
        <div class="title txt-c">{{item.name}}</div>
        <div class="btnDetail txt-c" @click="goPage(item)">{{item.name}}</div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";


const title = ref('首页');
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const emojiList = ref([]);
// 获取表情包合集数据
function getEmojiList () {
  loading.value = true;
  emojiList.value = [{
    id: 1,
    name: '表情包合集1',
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  }]
  loading.value = false;

}
function goPage (item) {
  router.push({
    path: `/detail/${item.id}`
  })
}
getEmojiList()
const handler = () => {
  title.value = route.meta.title;
}

onUpdated(handler);
onMounted(handler);




</script>

<style scoped lang="less">
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .list-emoji {
    height: 20rem;
    background: red;

    .list {
      padding: 0.88rem 0.26rem 0;

      .item {
        position: relative;
        margin-bottom: 0.15rem;
        padding: 0.08rem 0.08rem 0;
        width: 1.52rem;
        height: 2.06rem;
        background: yellow;

        .avatar {
          width: 100%;
          height: 1.36rem;
          overflow: hidden;
          border-radius: 0.2rem;
        }

        .title {
          width: 100%;
          height: 0.36rem;
          line-height: 0.36rem;
          color: #A63B00;
        }
        .btnDetail {
          margin: 0 auto;
          width: 0.94rem;
          height: 0.36rem;
          line-height: 0.36rem;
          background: blue;
          border-radius: 0.18rem;
          color: gold;
        }
      }
    }
  }
</style>
