<template>
  <div class="list-center">
    <div class="top">
        <div class="banner">
            <img :src="'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800'" alt="">
        </div>
        <div class="title txt-c">1111111</div>
    </div>
    <div class="list">
        <div
            class="item-container"
            v-for="(item, index) in emojiList"
            :key="index"
        >
            <div class="item-box">
                <div class="avatar">
                    <img :class="{'filter': item.status != 0 }" :src="item.avatar" />
                    <div class="opa flex-align-end flex-center f12 col-white ">
                        <div class="flex flex-center">
                            <Loading1 class="m-r-5" color='#fff' width="0.08rem" heigh="0.08rem" />
                            <span>生成中</span>
                        </div>
                    </div>
                </div>
                <div class="title txt-c">{{item.name}}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Loading1 } from '@nutui/icons-vue'


const title = ref('11111');
const loading = ref(true);
const route = useRoute();
const router = useRouter();
console.log(route, router)
const emojiList = ref([]);

const handler = () => {
  title.value = route.meta.title;
//   title.value = '333';
//   console.log(title)
}

console.log('222222')
// 获取表情包合集数据
function getCenterList () {
  loading.value = true;

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
  }]
  console.log(route, '----')
  route.meta.title = '111111'
  router.replace(route)
  loading.value = false;

}

function goPage (item) {
  router.push({
    path: `/detail/${item.id}`
  })
}
// getCenterList()


// onUpdated(getCenterList);
onMounted(getCenterList);




</script>

<style scoped lang="less">

</style>
