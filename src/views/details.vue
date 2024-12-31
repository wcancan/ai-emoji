<template>
  <div class="details-page">
    <div class="list-center">
      <div class="top-banner">
        <img :src="emojiData.coverUrl" alt="">
      </div>
      <div class="list">
        <div class="list-emoji-title">
          <h4>{{emojiData.templateName}}</h4>
          <p class="list-emoji-desc">{{emojiData.templateDesc}}</p>
        </div>
        <div class="item-container" v-for="(item, index) in emojiData.emoticonList" :key="index">
          <div class="item-box" @click="handlePopup(`preview`)">
            <div class="avatar">
              <img :src="item.cdnUrl" />
            </div>
            <div class="cover-mask">
              <p class="title txt-c">
                {{item.emoticonName}}
                <span>{{item.emoticonName}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="btnStatus == 2" class="list-b-btn" @click="handlePopup(`upload`)">
        制作表情
      </div>
      <div class="list-b-btn" v-else @click="handlePopup(`pay`)">
        解锁表情合集
      </div>
    </div>
    <div>
      <nut-popup v-model:visible="showPopup" closeable position="bottom" :style="popupData[popupData.curPopup].style">
        <template #close-icon>
          <img class="close-btn" src="../assets/img/close.png" alt="">
        </template>
        <div class="popup-block">
          <h4 class="popup-title" :class="'popup-t-'+popupData.curPopup"></h4>
          <div class="popup-con">
            <div v-if="popupData.curPopup==`generate`" class="gen-popup-con">
              <div class="progress-block">
                <nut-space align="center">
                  <nut-circle-progress :stroke-width="8" :radius="33" :path-color="`rgba(142, 17, 17, 0.22)`"
                    :color="`#fff`" :progress="20">
                    {{``}}
                  </nut-circle-progress>
                </nut-space>
              </div>
              <p class="progress-time">努力生成中...预计需要2分钟</p>
              <p>生成的作品将储存于「我的」页面</p>
              <div class="gen-b-btn">
                <view class="popup-btn" @click="toCenterPage">前往查看</view>
              </div>
            </div>
            <div v-else-if="popupData.curPopup==`pay`" class="pay-popup">
              <div class="pay-popup-img">
                <img :src="popupData.coverUrl" alt="">
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
              <div class="pay-btn" @click="handlePay">立即支付1元</div>
              <p class="pay-tips"> <i></i>
                活动表情合集系虚拟商品，购买后不支持退款，活动到期后权益自动取消
                请仔细核对购买账号。</p>
            </div>
            <div v-else-if="popupData.curPopup==`preview`" class="popup-preview">
              <img src="https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800"
                alt="">
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
                  <view @click="showPopup = false" class="popup-btn popup-bd-btn">取消</view>
                </nut-col>
                <nut-col :span="12">
                  <view class="popup-btn" @click="handlePopup(`generate`)">上传</view>
                </nut-col>
              </nut-row>
            </div>
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
    tokenValidate
  } from "@/api/api.js"
  import {
    useRoute,
    useRouter
  } from "vue-router";
  const route = useRoute();
  console.log("route.query", route.query.id)
  const router = useRouter();
  const btnStatus = ref(1); // 1解鎖表情包 2製作表情
  let userInfo = JSON.parse(decodeURIComponent(atob(
    'JTdCJTIyc2Vzc2lvbklkJTIyJTNBJTIyZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBjM01pT2lKb2IzVnVaQzF3YjNKMFlXd2lMQ0pwWVhRaU9qRTNNelUyTXprMU1qa3NJbVY0Y0NJNk1UY3pOVGN5TlRreU9Td2ljR0Z6YzE5cFpDSTZJalV6TXprME1EQTJPVGd3TlRrNE5ERTFNU0lzSW1Gd2NHbGtJam9pSWl3aWRHVnNJam9pTVRneU5EUXlOemMwTmpRaWZRLkRvWGlQSDYyaHdveUllRHlCc0s3TGR6eDByZ1JVdFlVVHVjSXZSdTV2MWMlMjIlMkMlMjJkaWdpdGFsU2Vzc2lvbklkJTIyJTNBJTIyZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5YVdRaU9pSTFNek01TkRBd05qazRNRFU1T0RReE5URWlMQ0poY0hCcFpDSTZJaUlzSW5Cb2IyNWxJam9pSWl3aWFXRjBJam94TnpNMU5qTTVOVEk1TENKbGVIQWlPakUzTXpVM01qVTVNamw5LkJYWTVmZWViN19TbEJwUHpmX3k2Z1lqQ2o5b01sTEJHVkVjNl93V3FjZ0ElMjIlMkMlMjJwYXNzSWQlMjIlM0ElMjI1MzM5NDAwNjk4MDU5ODQxNTElMjIlMkMlMjJzZWNyZXQlMjIlM0ElMjIlMjIlMkMlMjJtc2lzZG4lMjIlM0ElMjIxODI0NDI3NzQ2NCUyMiUyQyUyMm1zaXNkblR5cGUlMjIlM0ElMjIwJTIyJTJDJTIydXNlc3Npb25JZCUyMiUzQSUyMlVEbmlkMDAwMDAxMTczNTYzNzkzMjQ1NE5uQ2Q2YXhlTU94RUczNWY2Mm5jZ0ZOcTl2Rlg4ekM4JTIyJTJDJTIybmlja25hbWUlMjIlM0ElMjIlMjIlMkMlMjJ0YWd2YWxzJTIyJTNBJTVCJTIyMCUyMiUyQyUyMjAlMjIlNUQlMkMlMjJfbG9jYWx0aW1lU3RhbXBlXyUyMiUzQTE3MzU2Mzk1MzExMzMlN0Q='
  )))
  userInfo.token = "STnid0000011735639479729xDEpwIJYdcbHSOBLvZr7TRzq6IYEIw4R"
  console.log("----------", userInfo);
  const activityData = {
    activityId: "test",
    appId: "10004",
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
      emoticonName: `表情包名称`
    }],
  });
  const getEmojiDetail = async () => {
    const resp = await getDetail({
      templateId: route.query.id
    })
    if (resp.code == 200) {
      emojiData.value = resp.data;
    }
  }
  const getUserBuy = async () => {
    const resp = await getUserAsset({
      activityId: activityData.activityId,
      appId: activityData.appId,
      assetCode: route.query.id
    })
    if (resp.code == 200 && resp.data && resp.data.list.length > 0) {
      btnStatus.value = resp.data.list.filter(item => item.templateId == route.query.id).length > 0 ? 2 : 1;
    } else {
      btnStatus.value = 1
    }
  }

  const chenkToken = async () => {
    const resp = await tokenValidate({
      token: userInfo.token,
      //sourceId: ""
    })
    if (resp.code == 200) {
      getEmojiDetail();
      getUserBuy();
    } else {
      //router.push('/list')
    }
  }
  chenkToken();

  const toCenterPage = (key) => {
    showPopup.value = false;
    router.push({
      path: `/center`
    })
  }
  const payWay = ref(`1`);

  //支付
  const handlePay = async () => {
    const payParam = {
      user: {
        passId: userInfo.passId
      },
      code: `m1873976352657965059`,
      name: `爱豆`,
      bids: [{
        payWay: `1064`,
        amount: 11,
        extInfo: {
          bankCode: `AP`,
          saleType: `1`,
          pageURL: `http://localhost:8080/details?id=m1873976352657965057&mask&price`
        }
      }],
      appId: activityData.appId,
      activityId: activityData.activityId
    }
    
    const resp = await subscribeCharging(payParam);
    console.log(resp)
    if (resp.code == 200) {
      //支付成功跳转页面
    }
    showPopup.value = false
  }

  let orderStatus = 1;
  const checkOrderStatus = async () => {
    if (route.query.id) {
      const resq = await getOrderStatus({
        orderId: route.query.oid
      })
      if (resq == 200 && res.data) {
        orderStatus = 2
      } else {
        setTimeout(() => {
          if (orderStatus == 1) {
            checkOrderStatus();
          }
        }, 1000);
        setTimeout(() => {
          orderStatus = 2
        }, 6000);
      }
    }
  }
  checkOrderStatus();


  const imageUrl = ref(``)
  const confirm = (url) => {
    imageUrl.value = url
  };
  const avatarCropperRef = ref();
  const popupData = {
    curPopup: `upload`, // upload preview pay generate
    coverUrl: `https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800`,
    upload: {
      title: `上传图片`,
      style: {
        height: `5.36rem`,
        background: `transparent`
      },
    },
    preview: {
      title: `表情预览`,
      style: {
        height: `4.32rem`,
        background: `transparent`
      },
    },
    pay: {
      style: {
        height: `3.51rem`,
        background: `transparent`
      },
      title: ` 购买表情合集`,
    },
    generate: {
      style: {
        height: `2.85rem`,
        background: `transparent`
      },
      title: `正在生成`,
    }

  };
  const showPopup = ref(false);
  const handlePopup = (key) => {
    showPopup.value = false;
    popupData.curPopup = key;
    showPopup.value = true;
  };
</script>

<style scoped lang="less">
  .popup-block {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 0.1rem;

    .popup-title {
      width: 2.3rem;
      height: 0.69rem;
      position: absolute;
      top: -0.024rem;
      left: 50%;
      margin-left: -1.07rem;
      background: url("../assets/img/t_upload.png");
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.17rem;
      font-weight: bold;
      color: #FEFAE7;
      line-height: 0.45rem;
      z-index: 1;

      &.popup-t-preview {
        background: url("../assets/img/t_preview.png");
        background-size: 100% 100%;
      }

      &.popup-t-pay {
        background: none;
      }

      &.popup-t-generate {
        background: url("../assets/img/t_generate.png");
        background-size: 100% 100%;
      }
    }
  }

  .popup-con {
    position: relative;
    width: 100%;
    height: 100%;
    --bg: linear-gradient(180deg, #DF4632, #F07559, #FF7A29);
    --border: linear-gradient(0deg, #F4B583, #F8E2C2);
    border: 2px solid transparent;
    background-image: var(--bg), var(--border);
    background-origin: border-box;
    background-clip: content-box, border-box;
    border-radius: 0.36rem 0.36rem 0 0;
    text-align: center;

    .pay-popup {
      color: #fff;
      padding: 0.15rem 0.15rem 0;
    }

    .pay-title {
      font-weight: bold;
      padding: 0.18rem 0 0.13rem;
    }
  }

  .pay-popup-img {
    margin: 0.45rem auto 0;
    width: 3.45rem;
    height: 0.63rem;
    overflow: hidden;
    border-radius: 0.2rem;
  }

  .pay-block {
    text-align: left;
  }

  .pay-icon {
    width: 0.26rem;
    height: 0.26rem;
    position: absolute;
  }

  .pay-check-icon {
    display: inline-block;
    width: 0.17rem;
    height: 0.17rem;
    background: #fff;
    border-radius: 50%;
    border: 0.01px solid #C7C7C7;
  }

  .pay-group {
    display: block;
    width: 100%;
  }

  .pay-list {
    display: block;
    height: 0.26rem;
    position: relative;
    padding: 0.05rem 0;
  }

  .pay-txt {
    padding-left: 0.39rem;
    color: #fff;
  }

  .pay-icon-r {
    position: absolute;
    right: 0;
    top: 0.09rem;
    width: 0.17rem;
    height: 0.17rem;
  }

  .pay-checked-icon {
    border-radius: 50%;
    background: #DF7957;
  }

  .pay-wx-icon {
    background: url("../assets/img/p_title.png");
    background-size: 100% 100%;
  }

  .pay-ali-icon {
    background: url("../assets/img/close.png");
    background-size: 100% 100%;
  }

  .gen-popup-con {
    padding-top: 0.61rem;
    color: #FFFFFF;

    p {
      padding: 0.03rem;
    }

    .progress-time {
      font-weight: 600;
    }

    .gen-b-btn {
      padding: 0.18rem 0 0.08rem;
    }
  }

  .pay-btn {
    margin-top: 0.1rem;
    width: 3.45rem;
    height: 0.44rem;
    background: linear-gradient(90deg, #F6D29B, #FAEAC6);
    border-radius: 0.22rem;
    font-weight: bold;
    color: #582F13;
    line-height: 0.44rem;
  }

  .pay-tips {
    position: relative;
    font-size: 0.09rem;
    color: #FFEDE6;
    line-height: 0.12rem;
    padding-top: 0.1rem;
    padding-left: 0.38rem;
    padding-right: 0.18rem;
    text-align: left;

    i {
      position: absolute;
      left: 0.2rem;
      width: 0.15rem;
      height: 0.15rem;
      background: #000000;
      border-radius: 50%;
      opacity: 0.5;

    }
  }

  .close-btn {
    width: 0.19rem;
    height: 0.19rem;
  }



  .upload-block {
    padding-top: 0.55rem;
    font-size: 0.14rem;
    color: #FFFFFF;
    line-height: 0.16rem;
    text-align: center;
  }

  .upload-con {
    width: 1.96rem;
    height: 1.96rem;
    margin: 0.16rem auto 0;
    background: #FFF6E6;
    border-radius: 0.23rem;
    overflow: hidden;
  }

  .upload-btn {
    width: 1.96rem;
    height: 1.96rem;
    font-size: 0.14rem;
    color: #FFFFFF;
    line-height: 0.16rem;
    background: linear-gradient(0deg, #DF4632 38.0126953125%, #F07559 70.166015625%, #FF7A29 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-top: 0.68rem;

    i {
      display: block;
      margin: 0 auto 0.08rem;
      width: 0.39rem;
      height: 0.39rem;
      background: url("../assets/img/sample_photo.png");
      background-size: 100% 100%;
    }
  }

  .sample-photo {
    width: 100%;
    height: 1.6rem;
    background: url("../assets/img/sample_photo.png");
    background-size: 100% 100%;
  }

  .popup-preview {
    width: 3.01rem;
    margin: 0.66rem auto 0;

    img {
      width: 100%;
      height: 3.01rem;
      display: block;
      border-radius: 0.23rem;
    }

    .preview-title {
      padding: 0.24rem 0 0;
      text-align: center;
      font-size: 0.17rem;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 0.17rem;
    }

  }
</style>