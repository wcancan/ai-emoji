<template>
  <div class="list">
    <div class="list-center">
      <div class="top-banner">
        <img :src="'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800'"
          alt="">
      </div>
      <div class="list">
        <div class="list-emoji-title">
          <h4>{{emojiData.title}}</h4>
          <p>{{emojiData.desc}}</p>
        </div>
        <div class="item-container" v-for="(item, index) in emojiList" :key="index">
          <div class="item-box" @click="handlePreviewPopup()">
            <div class="avatar">
              <img :src="item.avatar" />
            </div>
            <div class="title txt-c">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="list-b-btn" @click="handlePayPopup()">
        解锁表情合集
      </div>
      <div class="list-b-btn"  @click="handleUploadPopup()">
        制作表情
      </div>
    </div>
    <div>
      <nut-popup v-model:visible="generatePopup" closeable position="bottom" :style="popupData.generate.style">
        <template #close-icon>
          <img class="close-btn" src="../assets/img/close.png" alt="">
        </template>
        <div class="popup-con">
          <h4 class="popup-title">正在生成</h4>
          <div class="gen-popup-con">
            <div class="progress-block">
              <nut-space align="center">
                <nut-circle-progress :stroke-width="8" :radius="33" :path-color="'rgba(142, 17, 17, 0.22)'"
                  :color="'#fff'" :progress="20">
                  {{''}}
                </nut-circle-progress>
              </nut-space>
            </div>
            <p class="progress-time">努力生成中...预计需要2分钟</p>
            <p>生成的作品将储存于「我的」页面</p>
            <div class="gen-b-btn">
              <nut-row>
                <nut-col :span="12">
                  <view class="popup-btn popup-bd-btn">继续生成</view>
                </nut-col>
                <nut-col :span="12">
                  <view class="popup-btn">前往查看</view>
                </nut-col>
              </nut-row>
            </div>
          </div>
        </div>
      </nut-popup>
      <nut-popup v-model:visible="payPopup" closeable position="bottom" :style="popupData.pay.style">
        <template #close-icon>
          <img class="close-btn" src="../assets/img/close.png" alt="">
        </template>
        <div class="popup-con ">
          <h4 class="popup-title">购买表情合集</h4>
          <div class="pay-popup">
            <div class="pay-popup-img">
              <img src="../assets/img/sample_photo.png" alt="">
            </div>
            <div class="pay-block">
              <p class="pay-title">选择支付方式</p>

              <nut-radio-group class="pay-group" v-model="val" text-position="left">
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
            <div class="pay-btn">立即支付1元</div>
            <p class="pay-tips"> <i></i>
              活动表情合集系虚拟商品，购买后不支持退款，活动到期后权益自动取消
              请仔细核对购买账号。</p>
          </div>
        </div>
      </nut-popup>
      <nut-popup v-model:visible="previewPopup" closeable position="bottom" :style="popupData.preview.style">
        <template #close-icon>
          <img class="close-btn" src="../assets/img/close.png" alt="">
        </template>
        <div class="popup-con">
          <h4 class="popup-title">表情预览</h4>
          <div class="popup-preview">
            <img src="../assets/img/sample_photo.png" alt="">
            <h4 class="preview-title">表情预览</h4>
          </div>
        </div>
      </nut-popup>
      <nut-popup v-model:visible="uploadPopup" closeable position="bottom" :style="popupData.upload.style">
        <template #close-icon>
          <img class="close-btn" src="../assets/img/close.png" alt="">
        </template>
        <div class="popup-con">
          <h4 class="popup-title">上传图片</h4>

          <div class="upload-block">
            <p class="">请上传一张人脸图片</p>
            <div class="upload-con">
              <nut-uploader url="https://xxxx">
                <div class="upload-btn">
                  <i class="upload-icon"></i>
                  <p>点击上传</p>
                </div>
              </nut-uploader>
            </div>
          </div>
          <div class="sample-photo"></div>
          <nut-row>
            <nut-col :span="12">
              <view class="popup-btn popup-bd-btn">取消</view>
            </nut-col>
            <nut-col :span="12">
              <view class="popup-btn" @click="handleGeneratePopup()">上传</view>
            </nut-col>
          </nut-row>
        </div>
      </nut-popup>
    </div>
  </div>
</template>

<script setup>
  import {
    ref
  } from "vue";
  const val = ref('1');
  const emojiData = {
    title: '表情名称',
    desc: '详细描述详细描述详细描述详细描述详细描述详细描述详细 描述详细描述详细描述'
  };
  const emojiList = [{
      id: 1,
      name: '表情包合集0',
      status: 0,
      avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    }, {
      id: 1,
      name: '表情包合集1',
      status: 1,
      avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    }, {
      id: 1,
      name: '表情包合集2',
      status: 2,
      avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    }, {
      id: 1,
      name: '表情包合集3',
      status: 0,
      avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    }, {
      id: 1,
      name: '表情包合集4',
      status: 1,
      avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    }, {
      id: 1,
      name: '表情包合集5',
      status: 2,
      avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    }

  ];

  const popupData = {
    curPopup: 'upload',
    upload: {
      title: '上传图片',
      style: {
        height: '5.36rem',
        background: 'transparent'
      },
    },
    preview: {
      title: '表情预览',
      style: {
        height: '4.32rem',
        background: 'transparent'
      },
    },
    pay: {
      style: {
        height: '3.51rem',
        background: 'transparent'
      },
      title: '正在生成',
    },
    generate: {
      style: {
        height: '2.85rem',
        background: 'transparent'
      },
      title: '购买表情合集',
    }

  };


  const previewPopup = ref(false);
  const uploadPopup = ref(false);
  const payPopup = ref(false);
  const generatePopup = ref(false);
  const handlePreviewPopup = () => {
    previewPopup.value = true
  };
  const handleUploadPopup = () => {
    uploadPopup.value = true
  };
  const handlePayPopup = () => {
    payPopup.value = true
  };
  const handleGeneratePopup = () => {
    generatePopup.value = true
  };
</script>

<style scoped lang="less">
  .list {
    background: #DF4632;
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

  .popup-title {
    width: 2.14rem;
    height: 0.45rem;
    position: absolute;
    top: -0.02rem;
    left: 50%;
    margin-left: -1.07rem;
    background: url("../assets/img/p_title.png");
    background-size: 100% 100%;
    text-align: center;
    font-size: 0.17rem;
    font-weight: bold;
    color: #FEFAE7;
    line-height: 0.45rem;
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

    i {
      display: block;
      margin: 0.68rem auto 0.08rem;
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