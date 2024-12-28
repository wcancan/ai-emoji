<template>
  <div class="list">
    <div class="top-banner">
      <img src="" alt="">

    </div>
    <div>
      <nut-cell title="我是标题" desc="描述文字" @click="click"></nut-cell>
      <nut-popup v-model:visible="show" closeable position="bottom" :style="popupStyle">
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
              <view class="popup-btn">上传</view>
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
  const popupStyle = {
    height: '5.36rem',
    background: 'transparent'

  };
  const show = ref(false);
  const click = () => {
    show.value = true;
  };
</script>

<style scoped lang="less">
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
</style>