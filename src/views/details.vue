<template>
  <div class="details-page">
    <div class="list-center">
      <div class="top-banner-container">
        <div class="top-banner">
          <img :src="emojiData.coverUrl" alt="" />
        </div>

        <div class="list-emoji-title">
          <h4>{{ emojiData.templateName }}</h4>
          <p class="list-emoji-desc">{{ emojiData.templateDesc }}</p>
        </div>
      </div>

      <div class="list">
        <div class="item-container" v-for="(item, index) in emojiData.emoticonList" :key="index">
          <div class="item-box" @click="handlePopup(`preview`)">
            <div class="avatar">
              <img :src="item.cdnUrl" />
            </div>
            <p class="title txt-c">
              <span>{{ item.emoticonName }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <div v-if="btnStatus == 2" class="list-b-btn bg-btn-make" @click="handlePopup(`upload`)"></div>
        <div class="list-b-btn bg-btn-lock" v-else @click="handlePopup(`pay`)"></div>
        <div class="tips">
          <p class="flex flex-center">
            <span class="m-r-5"></span>
            上传一张正面人脸照片生成一套专属表情包
          </p>
        </div>
      </div>
    </div>
    <div>
      <nut-popup v-model:visible="showPopup" closeable position="bottom" :style="popupData[popupData.curPopup].style">
        <template #close-icon>
          <div class="close-btn"></div>
          <!-- <img class="close-btn" src="../assets/img/close.png" alt=""> -->
        </template>
        <div class="popup-con">
          <!-- <h4 class="popup-title">{{popupData[popupData.curPopup].title}}</h4> -->
          <h4 class="popup-title" :class="'popup-title-bg-'+popupData.curPopup">
            {{ popupData[popupData.curPopup].title }}
          </h4>
          <div v-if="popupData.curPopup == `generate`" class="gen-popup-con">
            <div class="progress-block">
              <nut-space align="center">
                <nut-circle-progress :stroke-width="8" :radius="33" :path-color="`rgba(142, 17, 17, 0.22)`"
                  :color="`#fff`" :progress="20">
                  {{ `` }}
                </nut-circle-progress>
              </nut-space>
            </div>
            <p class="progress-time">努力生成中...预计需要2分钟</p>
            <p>生成的作品将储存于「我的」页面</p>
            <div class="gen-b-btn">
              <view class="popup-btn" @click="toCenterPage">前往查看</view>
            </div>
          </div>
          <div v-else-if="popupData.curPopup == `pay`" class="pay-popup">
            <div class="pay-popup-img-con">
              <!-- <i>购买次数：4次</i> -->
              <span class="times">购买次数：4次</span>
              <span class="date">有效期至2024/12/31</span>
              <!-- <img src="../assets/img/bg_pay_tips.png" alt=""> -->
            </div>
            <div class="pay-block">
              <p class="pay-title">选择支付方式</p>
              <nut-radio-group class="pay-group" v-model="payWay" text-position="left">
                <nut-radio label="1" class="pay-list">
                  <i class="pay-wx-icon pay-icon"></i>
                  <p class="pay-txt">微信支付</p>
                  <template #icon>
                    <i class="pay-check-icon pay-icon-r"></i>
                  </template>
                  <template #checkedIcon>
                    <i class="pay-checked-icon pay-icon-r"></i>
                  </template>
                </nut-radio>

                <nut-radio label="2" class="pay-list">
                  <i class="pay-ali-icon pay-icon"></i>
                  <p class="pay-txt">支付宝支付</p>
                  <template #icon>
                    <i class="pay-check-icon pay-icon-r"></i>
                  </template>
                  <template #checkedIcon>
                    <i class="pay-checked-icon pay-icon-r"></i>
                  </template>
                </nut-radio>
              </nut-radio-group>
            </div>
            <div class="pay-btn" @click="handlePay">立即支付¥1元</div>
            <p class="pay-tips">
              <i></i>
              <span>活动表情合集系虚拟商品，购买后不支持退款，活动到期后权益自动取消请仔细核对购买账号。</span>
            </p>
          </div>
          <div v-else-if="popupData.curPopup == `preview`" class="popup-preview">
            <img src="../assets/img/sample_photo.png" alt="" />
            <h4 class="preview-title">表情预览</h4>
          </div>
          <div v-else class="upload-popup">
            <div class="upload-block">
              <p class="">请上传一张人脸图片</p>
              <div class="upload-con">
                <nut-avatar-cropper ref="avatarCropperRef" @confirm="confirm">
                  <div class="upload-img-pre">
                    <img v-if="imageUrl" :src="imageUrl" />
                    <div class="re-upload-btn">
                      <i></i>
                      <p>重新上传</p>
                    </div>
                  </div>
                  <div class="upload-btn">
                    <i class="upload-icon"></i>
                    <p>点击上传</p>
                  </div>
                  <template #toolbar>
                    <div class="b-toolbar">
                      <p>请将小脸蛋调整摆正至框内</p>
                      <i @click="avatarCropperRef.rotate()"></i>
                      <span @click="avatarCropperRef.confirm()"></span>
                    </div>
                  </template>
                </nut-avatar-cropper>
              </div>
            </div>
            <div class="sample-photo"></div>
            <nut-row>
              <nut-col :span="12">
                <view @click="showPopup = false" class="popup-btn popup-bd-btn"></view>
              </nut-col>
              <nut-col :span="12">
                <view class="popup-btn popup-btn-make-dis" :class="{
                    'popup-btn-make': imageUrl && imageUrl.length > 0,
                  }" @click="handlePopup(`generate`)"></view>
              </nut-col>
            </nut-row>
          </div>
        </div>
      </nut-popup>
    </div>
  </div>
</template>

<script setup>
  import {
    ref
  } from "vue";
  import {
    getDetail,
    getUserAsset,
    subscribeCharging,
    getOrderStatus,
    createEmoticon,
    auditImage,
    tokenValidate,
  } from "@/api/api.js";
  import {
    useRoute,
    useRouter
  } from "vue-router";
  import {
  showToast
} from '@nutui/nutui'
  const route = useRoute();
  console.log("route.query", route.query.id);
  const router = useRouter();
  const btnStatus = ref(1); // 1解鎖表情包 2製作表情
  let userInfo = JSON.parse(
    decodeURIComponent(
      atob(
        "JTdCJTIyc2Vzc2lvbklkJTIyJTNBJTIyZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBjM01pT2lKb2IzVnVaQzF3YjNKMFlXd2lMQ0pwWVhRaU9qRTNNelU0T0RRMU1qQXNJbVY0Y0NJNk1UY3pOVGszTURreU1Dd2ljR0Z6YzE5cFpDSTZJalkxTlRJNE1EQXlOek01TlRZMU9EYzNOU0lzSW1Gd2NHbGtJam9pSWl3aWRHVnNJam9pTVRnNE9ERXlNRFF5TmpBaWZRLjVjdXVqVWFPVEhJR3VYYzBVOTUyYVhHMkY1SkJ6WEhBeXBidXVCRGlwX0ElMjIlMkMlMjJkaWdpdGFsU2Vzc2lvbklkJTIyJTNBJTIyZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5YVdRaU9pSTJOVFV5T0RBd01qY3pPVFUyTlRnM056VWlMQ0poY0hCcFpDSTZJaUlzSW5Cb2IyNWxJam9pSWl3aWFXRjBJam94TnpNMU9EZzBOVEl3TENKbGVIQWlPakUzTXpVNU56QTVNakI5Ljk4OVQ4M0VzR0xoeTZ3QUNPLXduMTFaYmlVak1OZE9faDFwZmt0OWZjYm8lMjIlMkMlMjJwYXNzSWQlMjIlM0ElMjI2NTUyODAwMjczOTU2NTg3NzUlMjIlMkMlMjJzZWNyZXQlMjIlM0ElMjIlMjIlMkMlMjJtc2lzZG4lMjIlM0ElMjIxODg4MTIwNDI2MCUyMiUyQyUyMm1zaXNkblR5cGUlMjIlM0ElMjIwJTIyJTJDJTIydXNlc3Npb25JZCUyMiUzQSUyMlVEbmlkMDAwMDAxMTczNTg4NDUxOTY4NURTYThwd2cydEsxT2JncmtoVUZXRkF6YjNxNEV1eUs2JTIyJTJDJTIybmlja25hbWUlMjIlM0ElMjIlMjIlMkMlMjJ0YWd2YWxzJTIyJTNBJTVCJTIyMCUyMiUyQyUyMjAlMjIlNUQlMkMlMjJfbG9jYWx0aW1lU3RhbXBlXyUyMiUzQTE3MzU4ODQ1MTk0NDYlN0Q="
      )
    )
  );
  userInfo.token = "STnid0000011735887310061RMi1ECWZmP9OTkrQ2z2SgwuFD5dEy7Cu";
  console.log("----------", userInfo);
  const activityData = {
    activityId: "10004",
    appId: "test",
  };
  const emojiData = ref({
    coverUrl: `https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800`,
    templateName: `表情模板名称`,
    templateDesc: `表情模板描述详细描述详细描述详细描述详细描述详细描述详细描述详细`,
    emoticonList: [{
      fileId: `111`,
      TemplateId: `素材id`,
      fileNo: `素材id`,
      localUrl: `素材id`,
      cdnUrl: `https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800`,
      emoticonId: `111`,
      emoticonName: `表情包名称`,
    }, ],
  });
  
  const getEmojiDetail = async () => {
    const resp = await getDetail({
      templateId: route.query.id,
    });
    if (resp.code == 200) {
      emojiData.value = resp.data;
    }
  };
  const getUserBuy = async () => {
    const resp = await getUserAsset({
      activityId: activityData.activityId,
      appId: activityData.appId,
      assetCode: route.query.id,
    });
    if (resp.code == 200 && resp.data && resp.data.list.length > 0) {
      btnStatus.value =
        resp.data.list.filter((item) => item.templateId == route.query.id)
        .length > 0 ?
        2 :
        1;
    } else {
      btnStatus.value = 1;
    }
  };

  const chenkToken = async () => {
    const resp = await tokenValidate({
      token: userInfo.token,
      sourceId: "205082"
    });
    if (resp.code == 200) {
      getEmojiDetail();
      getUserBuy();
    } else {
      // getEmojiDetail();
      // getUserBuy();
      // checkOrderStatus()
      //router.push('/list')
    }
  };
  chenkToken();

  const toCenterPage = (key) => {
    showPopup.value = false;
    router.push({
      path: `/center`,
    });
  };
  const payWay = ref(`1`);

  //支付
  const handlePay = async () => {
    const payParam = {
      user: {
        passId: userInfo.passId,
      },
      code: `m1873976352657965059`,
      name: `爱豆`,
      bids: [{
        payWay: `1064`,
        amount: 11,
        extInfo: {
          bankCode: `AP`,
          saleType: `1`,
          pageURL: `http://localhost:8080/details?id=m1873976352657965057&mask&price`,
        },
      }, ],
      appId: activityData.appId,
      activityId: activityData.activityId,
    };

    const resp = await subscribeCharging(payParam);
    console.log(resp);
    if (resp.code == 200) {
      //支付成功跳转页面
    }
    showPopup.value = false;
  };

  let orderStatus = 1;
  const checkOrderStatus = async () => {
    // console.log('odId============', odId)
    if (route.query.oid) {
    // if (odId.value) {
      const resq = await getOrderStatus({
        // orderId: route.query.oid || odId.value,
        orderId: route.query.oid 
      });
      if (resq == 200 && res.data) {
        orderStatus = 2;
      } else {
        setTimeout(() => {
          if (orderStatus == 1) {
            checkOrderStatus();
          }
        }, 1000);
        setTimeout(() => {
          orderStatus = 2;
        }, 6000);
      }
    }
  };
  checkOrderStatus();

  const imageUrl = ref(``);
  const avatarCropperRef = ref();
  
  const confirm = (url) => {
    imageUrl.value = url;
    let currentDate = new Date();
      let year = currentDate.getFullYear(); // 获取当前年份
      let month = currentDate.getMonth() + 1; // 获取当前月份，注意月份从0开始，所以要加1
      let day = currentDate.getDate(); 
      const hours = currentDate.getHours(); // 获取小时
      const minutes = currentDate.getMinutes(); // 获取分钟
      const seconds = currentDate.getSeconds(); // 获取秒钟

      const messageId = () => Math.random().toString(32).slice(-8);
      let msgId = messageId();
      for (; msgId.length < 32;)
        msgId += messageId();
      msgId.slice(0, 32);
      const resq =  auditImage({
        messageId: msgId,
        publishTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        image: url
      });
      if (resq == 200 && res.data) {
        console.log()
       imageUrl.value = res.data.imageUrl;
      } else {
        imageUrl.value = url;
        const toast = showToast.text('图片存在风险', {
          cover: true,
        })
      }
    
  };
  
 
  
  const popupData = {
    curPopup: `upload`, // upload preview pay generate
    coverUrl: `https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800`,
    upload: {
      title: `上传图片`,
      style: {
        height: `5.36rem`,
        background: `transparent`,
      },
    },
    preview: {
      title: `表情预览`,
      style: {
        height: `4.32rem`,
        background: `transparent`,
      },
    },
    pay: {
      style: {
        height: `3.51rem`,
        background: `transparent`,
      },
      title: ` 购买表情合集`,
    },
    generate: {
      style: {
        height: `2.85rem`,
        background: `transparent`,
      },
      title: `正在生成`,
    },
  };
  const showPopup = ref(false);
  // 生成ai表情
  const handleCreateEmoticon = async () => {
    const resq = await createEmoticon({
      templateId: '', //详情接口返回
      styleId: '',//详情接口返回
      image: imageUrl.value
    });
    if (resq == 200 && res.data) {
        
    } else {
      
    }
  };
  const handlePopup = (key) => {
    console.log(emojiData.value)
    if (key != 'generate') {
      showPopup.value = false;
      popupData.curPopup = key;
      // popupData.curPopup = 'pay';
      showPopup.value = true;
    } else {
      handleCreateEmoticon()
    }
    // showPopup.value = false;
    // popupData.curPopup = key;
    // // popupData.curPopup = 'pay';
    // showPopup.value = true;
  };
</script>

<style scoped lang="less">
 
</style>