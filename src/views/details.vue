<template>
  <div class="details-page no-scrollbar">
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
      <div class="list no-scrollbar">
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

                <nut-radio v-if="!disabledAp" label="2" disabled class="pay-list pay-list-disable">
                  <i class="pay-ali-icon pay-icon"></i>
                  <p class="pay-txt">支付宝支付</p>
                  <template #icon>
                    <i class="pay-check-icon pay-icon-r"></i>
                  </template>
                  <template #checkedIcon>
                    <i class="pay-checked-icon pay-icon-r"></i>
                  </template>
                </nut-radio>

                <nut-radio v-if="disabledAp" label="2" class="pay-list">
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
              <div class="upload-con" @click="popClick('上传照片',7,3)">
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
              <nut-col :span="12" @click="popClick('取消',7,3)">
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
    onMounted,
    onBeforeUnmount
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
    page_id: 'details',
    page_name: '/details'
  }
  var timeGetGenerate = null
  const pageTitle = defineModel('title')
  pageTitle.value = ''
  const creatTxt = ref('倒数10秒，您的好「照」头来啦！')
  // const creatTxt = ref('努力生成中，请稍后')
  const route = useRoute();
  const router = useRouter();
  const btnStatus = ref(3); // 1解鎖表情包 2製作表情 3不展示
  let userInfo = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {};
  // var timerId = null
  const activityData = JSON.parse(sessionStorage.getItem("activity"));
  const emojiData = ref({});
  const cover = ref({})
  const emojiListData = ref([])
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
        pageTitle.value = resp.data.name
        // 取banner图
        resp.data.files.map((item) => {
          if (item.fileType == 13) {
            cover.value = item
          } else if (item.fileType == 11){
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
  //status 2部分成功， 3全部失败
  let toCenterPageData = ref({
    status: 1,
    mergeId: ''
  })
  const toCenterPage = (key) => {
    popClick("前往查看", 5, 3, true)
    if (timeGetGenerate) {
      clearTimeout(timeGetGenerate)
      timeGetGenerate = null
    }
    // if (timerId) {
    //   clearTimeout(timerId);
    //   timerId = null
    // }
    showPopup.value = false;
    if (toCenterPageData.value.status == 2) {
      router.push({
        query: {
          page: `center`,
          mergeId: toCenterPageData.value.mergeId
        }
      })
    } else {
      window.location.href = backUrl.centerListUrl
    }
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
  const payWay = ref(`1`);
  const disabledAp = ref(true);
  disabledAp.value = !(isWeChat())
  //支付
  const handlePay = async () => {
    popClick("立即支付", 6, 3)
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
          pageURL: `${backUrl.payBack}/#/?page=${route.query.page}&id=${route.query.id}&title=${route.query.title}`
        },
      }, ],
      appId: activityData.appId,
      activityId: activityData.activityId,
      
    };
    if (isWeChat()) {
      payParam.bids[0].extInfo.payMethod = "30"
    }
    console.log('payParam', payParam)
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
  const popClick = (name, p_type, e_type, is_leaved = false) => {
    amberTrack('pop_click', {
      pop_name: name,
      pop_type: p_type,
      element_id: emojiData.value.template2Id,
      element_name: emojiData.value.name,
      element_type: e_type
    })
    let data = {}
    if (is_leaved) {
      data = {
        is_leaved: "是"
      }
    }
    amberTrack('page_click', {
      ...amberParams,
      ...data,
      element_id: emojiData.value.template2Id,
      element_name: popupData.curPopup + emojiData.value.name,
      element_type: '3'
    })
  }
  const amberTrackPaymentConfirm = (data) => {
    amberTrack('payment_confirm', {
      ...amberParams,
      ...data,
      time: Math.floor(new Date().getTime() / 1000),
      payment_type: 2,
      product_name: emojiData.value.name, //表情合集ID
      product_id: route.query.id //表情合集ID
    })
  }

  const checkOrderStatus = async () => {
    if (route.query.orderId) {
      const resq = await getOrderStatus({
        orderId: route.query.orderId
      });
      amberTrackPaymentConfirm({
        order_id: route.query.orderId, //生成订单id
        status: resq.data ? "成功" : "待支付",
        amount: "",
        method: "",
      })
      if (resq.code == 200 && resq.data) {
        getEmojiDetail();
      } else {
        setTimeout(() => {
          checkOrderStatus();
        }, 10000);
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
    const toast = showToast.loading('审核中，请稍后', {
      cover: true,
      duration: 0
    })
    const resq = await auditImage({
      messageId: msgId,
      publishTime: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      image: url
    });
    toast.hide();
    if (resq.code == 200 && resq.data) {
      if (resq.data.result == 1) {
        auditErrImg.value = url
        amberTrack('photo_security_audit', {
          ...amberParams,
          is_pass: "是",
          fail_reason: ""
        })
        amberTrack('photo_save', {
          ...amberParams,
          is_pass: "是",
          fail_reason: ""
        })
      } else {
        imageUrl.value = auditErrImg.value
        const toast = showToast.text('图片存在风险', {
          cover: true,
        })
        amberTrack('photo_security_audit', {
          ...amberParams,
          is_pass: "否",
          fail_reason: resq.message
        })
        amberTrack('photo_save', {
          ...amberParams,
          is_pass: "否",
          fail_reason: resq.message
        })
      }
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
  let unGenerate = []
  let allFails = []
  // 轮询获取是否所有的生成完成
  let getCenterList = async (mergeId) => {
    const resp = await getMyEmoticon({
      mergeId: mergeId || ""
    });
    //status1 生成中 2生成成功 3生成失败 0已删除
    if (resp.code == 200 && resp.data) {
      resp.data.files.forEach(item => {
        if(item.status == 2) {
          unGenerate.push(item)
        } else if (item.status == 3) {
          allFails.push(item)
        }
      });
      if (unGenerate && unGenerate.length) {
        toCenterPageData.value = {
          mergeId,
          status: 2
        }
        router.push({
          query: {
            page: `center`,
            mergeId: mergeId
          }
        })
      } else if(allFails && unGenerate.length && unGenerate.length == resp.data.files.length) {
         toCenterPageData.value = {
          status: 3
        }
        window.location.href = backUrl.centerListUrl
      } else {
        timeGetGenerate = setTimeout(function () {
          unGenerate = []
          allFails = []
          getCenterList(mergeId)
        }, 10000);
      }
    }
  };

  // 生成ai表情
  const handleCreateEmoticon = async (key) => {
    popClick("开始生成", 7, 3)
    if (imageUrl.value == "") {
      return
    }
    showPopup.value = false;
    popupData.curPopup = key;
    showPopup.value = true;
    // if (timerId) {
    //   clearTimeout(timerId);
    //   timerId = null
    // }
    // timerId = setTimeout(function () {
    //   creatTxt.value = '努力生成中，请稍后'
    // }, 1000 * 60);
    const resq = await createEmoticon({
      templateId: emojiData.value.template2Id, //详情接口返回
      styleId: emojiData.value.sourceResourcesId, //详情接口返回
      image: imageUrl.value,
      appId: activityData.appId,
      activityId: activityData.activityId
    });
    // if (timerId) {
    //   clearTimeout(timerId);
    //   timerId = null
    // }
    if (resq.code == 200) {
      getCenterList(resq.data.mergeId)
      amberTrack('avatar_generate', {
        ...amberParams,
        is_success: "是",
        fail_reason: ""
      })
    } else {
      const toast = showToast.text(resq.message, {
        cover: true,
      })
      amberTrack('avatar_generate', {
        ...amberParams,
        is_success: "否",
        fail_reason: resq.message
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
    const times = Math.floor(new Date().getTime() / 1000);
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
    amberTrack('page_click', {
      ...amberParams,
      element_id: emojiData.value.template2Id,
      element_name: popupData.curPopup + emojiData.value.name,
      element_type: key =='preview' ? '8' : '3'
    })
    const times = Math.floor(new Date().getTime() / 1000);
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
    if (timeGetGenerate) {
      clearTimeout(timeGetGenerate)
      timeGetGenerate = null
    }
    // if (timerId) {
    //   clearTimeout(timerId);
    //   timerId = null
    // }
    const times = Math.floor(new Date().getTime() / 1000);
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
  const handlePageLeave = () => {
    // 在这里执行清理工作，如取消定时器、清除事件监听器等
    const start_time = sessionStorage.getItem('details_start_time')
    const end_time = Math.floor(new Date().getTime() / 1000);
    if (start_time && Number(start_time)) {
      amberTrack('page_view', {
        ...amberParams,
        start_time: start_time,
        stay_time: (end_time - start_time) + "",
        end_time: end_time,
        operation_type: 2, // 1进入，2离开
      })
    }
    sessionStorage.removeItem('details_start_time')
    if (timeGetGenerate) {
      clearTimeout(timeGetGenerate)
      timeGetGenerate = null
    }
    // if (timerId) {
    //   clearTimeout(timerId);
    //   timerId = null
    // }
  };
    // 使用onBeforeUnmount生命周期钩子来监听页面离开
    onBeforeUnmount(handlePageLeave);
</script>

<style scoped lang="less">
.list {
    scrollbar-width: thin;
  }
  .item-container {
    flex: 0 0 31.5%;
  }
</style>