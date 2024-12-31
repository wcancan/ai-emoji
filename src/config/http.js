import axios from 'axios'
import {
  showToast
} from '@nutui/nutui'
import { Md5 } from 'ts-md5';//md5加密后的密码
import CryptoJS from 'crypto-js'

// 假设这是你的密钥，通常从服务器获取
const key = CryptoJS.enc.Utf8.parse('hounddefault2024');

// 要加密的数据
const data = 'your data here';

// 加密数据
const encryptedData = CryptoJS.AES.encrypt(data, key, {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
});

// 转换为字符串（Base64编码）
const encryptedDataStr = encryptedData.toString();

// console.log(encryptedDataStr, "===============");

// const requestUrl = '/product/test'
const requestUrl = '/prep-portalx'
// const requestUrl = 'http://112.48.155.26:8088/product/test'

const toast = showToast.text('loading', {
  cover: true,
  duration: 0
})
toast.hide();

axios.interceptors.request.use(config => {
  console.log('config', config)
  config.url = requestUrl + config.url
  // config.headers.sid = "10001";
  const setReqId = () => Math.random().toString(32).slice(-8);
  let reqId = setReqId();
  for (; reqId.length < 32;)
    reqId += setReqId();
  reqId.slice(0, 32);
  let url = config.url;
  if(config.method == "get"){
    url = url.lastIndexOf("?") >0 ? url.substr(url.lastIndexOf("?")+1,url.length): "";
  }else{
    url = JSON.stringify(config.data)
  }
  config.headers.timestamp = (new Date).getTime()
  const signature = "".concat(reqId).concat(config.headers.timestamp).concat( url);
  console.log("======signature============",signature);
  config.headers.reqId = reqId;
  config.headers.encrypt = "0"
  config.headers.signature = CryptoJS.MD5(signature).toString();

  // if (config.url.indexOf("image.oss-cn-beijing.aliyuncs.com") == -1) {
  //   if (getCookie("WXSESSIONID") && config.url.indexOf("login/tokenLogin") == -1) {
  //     config.headers.common['WXSESSIONID'] = getCookie("WXSESSIONID");
  //   }
  // }
  // if(config.url.indexOf("/scale/web/detail") != -1 && getCookie("__app_sid")){
  //   config.headers.common["sid"] = getCookie("__app_sid")
  // }
  // if (config.url.indexOf('http') == -1) {
  //   config.url = process.env.VUE_APP_BASE_API_URL + config.url;
  // }
  return config
}, error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  // if (!getCookie("WXSESSIONID") && response.headers.wxsessionid) {
  //   setCookie("WXSESSIONID", response.headers.wxsessionid)
  // }
  // if ((response.config.url.indexOf("login/tokenLogin") != -1|| response.config.url.indexOf("web/user/login/login") != -1) && response.headers.wxsessionid) {
  //   setCookie("WXSESSIONID", response.headers.wxsessionid);
  // }
  let data = response.data
  // if (jsonApiList.indexOf(response.config.url.split(process.env.VUE_APP_BASE_API_URL)[1]) != -1 || jsonApiList.indexOf(response.config.url) != -1) {
  //   data = jsonlint.parse(response.data);
  // }

  // if (data.result !== 1 && data.result != 100101049 && data.result != 403 && data.result != 404) {
  //   message.error(data.msg)
  // }
  // if(data.result == 100101031) {
  //   sessionStorage.setItem("__userId", "");
  //   window.location.href = redirectUri(window.location.href);
  // }else if (data.result == 403 && mobileJS.isWX && data.msg == "请登录") {
  //   setCookie("__userId", "", -1)//100101031
  //   sessionStorage.setItem("__userId", "");
  //   setCookie("__redirect_url_", window.location.href)//100101031
  //   window.location.href = redirectUri(window.location.origin + "/my/index.html")
  // }else if (data.result == 403 && !mobileJS.isWX &&!mobileJS.isAppWeb() && data.msg == "请登录") {
  //   setCookie("__login", "__no_login",)
  // }
  console.log('hide toast')
  toast.hide()
  return data

}, (error) => {
  console.log('error')
  toast.hide()
  return Promise.reject(error)
})

const _buildUrl = (url, data = {}) => {
  for (let i in data) {
    if (url.indexOf('?') < 0) {
      url += '?'
    } else {
      url += '&'
    }
    url += i + '=' + data[i]
  }

  return url
}
export const getJson = (url, data = {}) => {
  return axios({
    method: 'GET',
    url: _buildUrl(url, data),
    data: data,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

export const postJson = (url, data = {}) => {
  return axios({
    method: 'POST',
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}