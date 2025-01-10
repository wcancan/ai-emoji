<template>
  <div class="details-page">
    <div class="list-center">
      <div class="top-banner-container">
        <div class="top-banner">
          <img :src="cover.fileUrl" alt="" />
        </div>
        <div class="list-emoji-title">
          <h4>{{ emojiData.name }}</h4>
          <p class="list-emoji-desc">{{ emojiData.desc }}</p>
        </div>
      </div>
      <div class="list">
        <div class="item-container" v-for="(item, index) in emojiListData" :key="index">
          <div class="item-box" @click="handlePopup(`preview`,item)">
            <div class="avatar">
              <img :src="item.fileUrl" />
            </div>
            <p class="title txt-c">
              <span>{{ item.fileName }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="btn-container" v-if="btnStatus != 3">
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
      <nut-popup v-model:visible="showPopup" @open="handlePopOpen" @close="handlePopClose" closeable position="bottom"
        :style="popupData[popupData.curPopup].style">
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
                <nut-circle-progress class="nut-icon-am-rotate nut-icon-am-infinite" :stroke-width="7" :radius="30"
                  :path-color="`rgba(255, 255, 255, 0.4)`" :color="`#fff`" :progress="25">
                  {{ `` }}
                </nut-circle-progress>
              </nut-space>
            </div>
            <p class="progress-time">{{ creatTxt }}</p>
            <p>生成的作品将储存于「我的」页面</p>
            <div class="gen-b-btn">
              <view class="popup-btn" @click="toCenterPage"></view>
            </div>
          </div>
          <div v-else-if="popupData.curPopup == `pay`" class="pay-popup">
            <div class="pay-popup-img-con">
              <!-- <i>购买次数：4次</i> -->
              <span class="times"></span>
              <span class="date">有效期至2025/02/28</span>
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
            <!-- <div class="pay-btn" @click="handlePay">立即支付¥1元</div> -->
            <div class="pay-btn" @click="handlePay">
              {{`立即支付¥${emojiData.templatePrice?emojiData.templatePrice/100: 0}元`}}</div>
            <p class="pay-tips">
              <i></i>
              <span>活动表情合集系虚拟商品，购买后不支持退款，活动到期后未使用的表情合集将失效，请仔细核对购买账号。</span>
            </p>
          </div>
          <div v-else-if="popupData.curPopup == `preview`" class="popup-preview">
            <img :src="popupData.coverUrl" alt="" />
            <h4 class="preview-title">{{popupData.tName}}</h4>
          </div>
          <div v-else class="upload-popup">
            <div class="upload-block">
              <p class="">请上传一张人脸图片</p>
              <div class="upload-con">
                <nut-avatar-cropper ref="avatarCropperRef" @confirm="confirm" @change="handleUploadStart">
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
    ref,
    watch,
    onMounted
  } from "vue";
  import {
    getDetail,
    getUserAsset,
    subscribeCharging,
    getOrderStatus,
    createEmoticon,
    auditImage,
    tokenValidate,
    getMyEmoticon
  } from "@/api/api.js";
  import {
    useRoute,
    useRouter,
    onBeforeRouteLeave
  } from "vue-router";
  import {
    showToast
  } from '@nutui/nutui'
  import {
    amberTrack
  } from '@/Composables/amber.js'
  import backUrl from '@/config/urlConfig.js'
  const amberParams = {
    page_id: 'list',
    page_name: '/list'
  }
  const creatTxt = ref('努力生成中...预计需要2分钟')
  // const creatTxt = ref('努力生成中，请稍后')
  const route = useRoute();
  const router = useRouter();
  const btnStatus = ref(3); // 1解鎖表情包 2製作表情 3不展示
  let userInfo = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {};



  const activityData = JSON.parse(sessionStorage.getItem("activity"));
  const emojiData = ref({
    name: `表情模板名称`,
    desc: `表情模板描述详细描述详细描述详细描述详细描述详细描述详细描述详细`,
    templateMark: 1,
    templatePrice: '',
    files: [{
      fileId: `111`,
      template2Id: `素材id`,
      fileNo: `素材id`,
      fileType: 1,
      originName: "th.jpg",
      localUrl: `素材id`,
      fileUrl: '',
      fileName: `表情包名称`,
    }, ],
  });
  let cover = ref({})
  let emojiListData = ref([])
  const getEmojiDetail = async () => {
    btnStatus.value = 3
    emojiListData.value = []
    emojiData.value = {}
    cover.value = {}
    const resp = await getDetail({
      templateId: route.query.id,
    });
    if (resp.code == 200) {
      if (resp.data) {
        emojiData.value = resp.data;
        // 取banner图
        resp.data.files.map((item) => {
          if (item.fileType == 13) {
            cover.value = item
          } else {
            emojiListData.value.push(item)
          }
        })

        if (emojiData.value.templateMark == 0 || emojiData.value.templateMark == 2) {
          // templateMark： 0免费， 1付费， 2限免
          btnStatus.value = 2
        } else {
          getUserBuy()
        }
      }
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
        resp.data.list.filter((item) => item.id == route.query.id)
        .length > 0 ?
        2 :
        1;
    } else {
      btnStatus.value = 1;
    }
  };

  const toCenterPage = (key) => {
    showPopup.value = false;
    window.location.href = backUrl.centerListUrl
  };
  const payWay = ref(`1`);

  //支付
  const handlePay = async () => {
    const payParam = {
      user: {
        passId: userInfo.passId,
      },
      code: route.query.id,
      name: emojiData.value.name,
      bids: [{
        // payWay 1WX 2AP
        payWay: `1064`,
        amount: emojiData.value.templatePrice || 1,
        extInfo: {
          bankCode: payWay.value == 1 ? `WX` : `AP`, //WX AP
          saleType: `1`,
          pageURL: `${backUrl.payBack}/#/?page=${route.query.page}&id=${route.query.id}`,
        },
      }, ],
      appId: activityData.appId,
      activityId: activityData.activityId,
    };

    const isWeChat = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("micromessenger") != -1) {
        return true;
      } else {
        return false;
      }
    };
    if (isWeChat()) {
      //payParam.bids[0].extInfo.payMethod = 30
    }

    const resp = await subscribeCharging(payParam);

    if (resp.code == 200) {
      amberTrackPaymentConfirm({
        order_id: resp.data.odId, //生成订单id
        status: "待支付", //待支付；成功；失败
        amount: resp.data.paymentInfo.amount,
        method: payWay.value,
      })
      //支付成功跳转页面
      if (resp.data && resp.data.paymentInfo) {
        const payUrl = resp.data.paymentInfo.payParameter.wapPayUrl
        window.location.href = payUrl
      }
    }
    showPopup.value = false;
  };
  const amberTrackPaymentConfirm = (data) => {
    amberTrack('payment_confirm', {
      ...amberParams,
      ...data,
      time: new Date().getTime(),
      payment_type: 2,
      product_name: emojiData.value.name, //表情合集ID
      product_id: route.query.id //表情合集ID
    })
    console.log("payment_confirm", {
      ...amberParams,
      ...data,
      time: new Date().getTime(),
      payment_type: 2,
      product_name: emojiData.value.name, //表情合集ID
      product_id: route.query.id //表情合集ID
    })
  }
  // amberTrack('poster_emoji_view', {
  //   ...amberParams,
  //   page_name: "个人-AI表情详情页", //生成订单id
  //   emoji_name: "表情合集名称", //待支付；成功；失败
  //   emoji_id: "表情合集ID",
  //   expression_name: "表情名称", //1微信；2支付宝，只有待支付有值上报
  //   expression_id: "表情ID",
  //   operation_type: 2 //1：显示表情 2：长按或截图保存
  // })

  let orderStatus = 1;
  const checkOrderStatus = async () => {
    // console.log('odId============', odId)
    if (route.query.oid) {
      // if (odId.value) {
      const resq = await getOrderStatus({
        // orderId: route.query.oid || odId.value,
        orderId: route.query.oid
      });
      amberTrackPaymentConfirm({
        order_id: route.query.oid, //生成订单id
        status: resq.code == 200 ? "成功" : "失败",
        amount: "",
        method: "",
      })
      if (resq.code == 200 && res.data) {
        orderStatus = 2;
      } else {
        if (orderStatus == 1) {
          setTimeout(() => {
            checkOrderStatus();
          }, 1000);
        }
      }
    }
  };
  checkOrderStatus();

  const imageUrl = ref(``);
  const avatarCropperRef = ref(null);
  const auditErrImg = ref("");
  const confirm = async (url) => {
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
    const resq = await auditImage({
      messageId: msgId,
      publishTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      image: url
    });

    if (resq.code == 200 && resq.data) {
      auditErrImg.value = url
    } else {
      imageUrl.value = auditErrImg.value
      const toast = showToast.text('图片存在风险', {
        cover: true,
      })
    }
    avatarCropperRef.value.cancel();
    amberTrack('page_click', {
      ...amberParams,
      element_id: emojiData.value.template2Id,
      element_name: popupData.curPopup + emojiData.value.name,
      element_type: '3'
    })
  };

  const popupData = {
    curPopup: `upload`, // upload preview pay generate
    coverUrl: ``,
    tName: ``,
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
  // 轮询获取是否所有的生成完成
  let getCenterList = async (mergeId) => {
    const resp = await getMyEmoticon({
      mergeId: mergeId || ""
    });
    //status1 生成中 2生成成功 3生成失败 0已删除
    if (resp.code == 200 && resp.data) {
      const unGenerate = resp.data.files.filter((item) => item.status == 1)
      if (unGenerate && unGenerate.length) {
        setTimeout(function () {
          getCenterList(mergeId)
        }, 5000);
      } else {
        router.push({
          query: {
            page: `center`,
            mergeId: resq.data.mergeId
          }
        })
      }
    }
  };
  // 生成ai表情
  const handleCreateEmoticon = async (key) => {
    if (imageUrl.value == "") {
      return
    }
    showPopup.value = false;
    popupData.curPopup = key;
    showPopup.value = true;
    if (timerId) {
      clearTimeout(timerId);
    }
    var timerId = setTimeout(function () {
      creatTxt.value = '努力生成中，请稍后'
    }, 1000);
    const resq = await createEmoticon({
      templateId: emojiData.value.template2Id, //详情接口返回
      styleId: emojiData.value.sourceResourcesId, //详情接口返回
      image: imageUrl.value,
      appId: activityData.appId,
      activityId: activityData.activityId
    });
    if (resq.code == 200) {
      getCenterList()
    } else {
      const toast = showToast.text(resq.message, {
        cover: true,
      })
    }
    amberTrack('page_click', {
      ...amberParams,
      element_id: emojiData.value.template2Id,
      element_name: emojiData.value.name,
      element_type: '3'
    })
  };

  const popKeyFlag = ref({
    key: '',
    start_time: ''
  })

  const startTimes = {
    "upload": 0,
    "preview": 0,
    "pay": 0,
    "generate": 0,
  }
  const stopWatch = watch(popupData.curPopup, (newVal, oldVal) => {
    // if (newVal) {
    amberTrack('page_click', {
      ...amberParams,
      element_id: emojiData.value.template2Id,
      element_name: newVal + emojiData.value.name,
      element_type: '3'
    })
    const times = new Date().getTime()
    startTimes[newVal] = times
    //key: upload preview pay generate
    amberTrack('pop_view', {
      ...amberParams,
      pop_name: newVal,
      pop_type: newVal == 'pay' ? 6 : (newVal == 'upload' ? 7 : 5),
      start_time: times,
      stay_time: '',
      end_time: ''
    })
    // } else {
    amberTrack('pop_view', {
      ...amberParams,
      pop_name: oldVal,
      pop_type: oldVal == 'pay' ? 6 : (oldVal == 'upload' ? 7 : 5),
      start_time: startTimes[oldVal],
      stay_time: times - startTimes[oldVal],
      end_time: times
    })
    // }
  })

  const handlePopOpen = (key, url) => {
    console.log('handlePopOpen', key)
    amberTrack('page_click', {
      ...amberParams,
      element_id: emojiData.value.template2Id,
      element_name: popupData.curPopup + emojiData.value.name,
      element_type: '3'
    })
    const times = new Date().getTime()
    startTimes[popupData.curPopup] = times
    //key: upload preview pay generate
    amberTrack('pop_view', {
      ...amberParams,
      pop_name: popupData.curPopup,
      pop_type: popupData.curPopup == 'pay' ? 6 : (popupData.curPopup == 'upload' ? 7 : 5),
      start_time: times,
      stay_time: '',
      end_time: ''
    })
  }
  const handlePopClose = (key, url) => {
    console.log('handlePopClose', key)
    const times = new Date().getTime()
    amberTrack('pop_view', {
      ...amberParams,
      pop_name: popupData.curPopup,
      pop_type: popupData.curPopup == 'pay' ? 6 : (popupData.curPopup == 'upload' ? 7 : 5),
      start_time: startTimes[popupData.curPopup],
      stay_time: times - startTimes[popupData.curPopup],
      end_time: times
    })
    if (popupData.curPopup == 'upload') {
      amberTrack('page_click', {
        ...amberParams,
        element_id: emojiData.value.template2Id,
        element_name: popupData.curPopup + emojiData.value.name,
        element_type: '3'
      })
    }
  }
  const handlePopup = (key, item) => {
    console.log('handlePopup', popupData.curPopup)
    if (item) {
      popupData.coverUrl = item.fileUrl || "";
      popupData.tName = item.fileName;
    }
    //key: upload preview pay generate
    if (key != 'generate') {
      showPopup.value = false;
      popupData.curPopup = key;
      showPopup.value = true;
    } else {
      handleCreateEmoticon(key)
    }
    console.log('handlePopup2', popupData.curPopup)
  };
  onMounted(() => {
    auditErrImg.value = ""
    imageUrl.value = ""
    getEmojiDetail()
  })

  const handleUploadStart = (key, url) => {
    amberTrack('page_click', {
      ...amberParams,
      element_id: emojiData.value.template2Id,
      element_name: popupData.curPopup + emojiData.value.name,
      element_type: '3'
    })
  }
  onBeforeRouteLeave((to, from, next) => {
    const start_time = sessionStorage.getItem('start_time')
    const end_time = new Date().getTime()
    if (start_time && Number(start_time)) {
      amberTrack('page_view', {
        ...amberParams,
        stay_time: end_time - start_time,
        end_time: start_time,
        operation_type: 2, // 1进入，2离开
      })
    }
    sessionStorage.removeItem('start_time')
    next()
  })
  
</script>

<style scoped lang="less">

</style>