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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .list-center {
    padding-top: 0.75rem;
    background: red;

        .top {
            margin: 0 auto;
            padding: 0.13rem 0.13rem 0;
            width: 2.45rem;
            height: 3rem;
            background: gold;
            border-radius: 0.1rem;

            .banner {
                width: 100%;
                height: 2.19rem;
            }

            .title {
                width: 100%;
                height: 0.64rem;
                line-height: 0.64rem;
            }
        }

        .list {
            padding: 0 0.14rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .item-container {
                margin-bottom: 0.12rem;
                padding: 0 0.06rem;
                width: 32%; /* 三列布局，每列宽度为33.33% */
                height: 1.2rem;
                padding: 10px;
                margin-bottom: 10px;
                text-align: center;

                .item-box {
                    padding: 0.06rem 0.06rem 0;
                    width: 100%;
                    height: 100%;
                    background: gold;
                    border-radius: 0.08rem;
                    overflow: hidden;
                }

                .avatar {
                    position: relative;
                    width: 100%;
                    height: 0.78rem;
                    overflow: hidden;
                    .opa {
                        position: absolute;
                        top: 0;
                        left: 0;
                        padding-bottom: 0.05rem;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.3);
                    }
                }
                .filter {
                    filter: blur(5px); /* 调整数值来改变模糊程度 */
                }
                .title {
                    width: 100%;
                    height: 0.2rem;
                    font-size: 0.12rem;
                }
            }
        }
    
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
