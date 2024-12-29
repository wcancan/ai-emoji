<template>
  <div class="list-emoji">
    <!-- <div class="list flex flex-between flex-wrap">
      <div
        class="item"
        v-for="(item, index) in emojiList"
        :key="index"
      >
        <div class="avatar">
          <img :src="item.avatar" alt="">
        </div>
        <div class="title txt-c">{{item.name}}</div>
        <div class="btnDetail txt-c" @click="go(item)">{{item.name}}</div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
    </div> -->
    <nut-infinite-loading
      v-model="infinityValue"
      load-txt="Loading..."
      load-more-txt="End~"
      :has-more="hasMore"
      @load-more="loadMore"
    >
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
          <div class="btnDetail txt-c" @click="go(item)">{{item.name}}</div>
        </div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </nut-infinite-loading>
  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getEmojiList } from "@/api/api";



// getEmojiList
const title = ref('首页');
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const emojiList = ref([]);

const cycle = ref(0)
const tabsValue = ref(0)
const sum = ref(24)
const infinityValue = ref(false)
const hasMore = ref(true)

const loadMore = (done) => {
  setTimeout(() => {
    emojiList.value.push({
    id: 2,
    name: '表情包合集1',
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  },{
    id: 2,
    name: '表情包合集1',
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  })
    cycle.value++
    if (cycle.value > 2) hasMore.value = false
    infinityValue.value = false
  }, 1000)
}

emojiList.value = [{
  id: 1,
  name: '表情包合集1',
  avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
}]
getEmojiList({
  configureId: '',
  type: 2
}).then((res) => {
  console.log(res, '1111')
  emojiList.value = [{
    id: 1,
    name: '表情包合集1',
    avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
  }]
  loading.value = false;
})


function go (item) {
  router.push({
    path: `/details/${item.id}`
  })
}
// getEmojiList()
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
    min-height: 100vh;
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
