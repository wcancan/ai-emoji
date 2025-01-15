import axios from 'axios'
import CryptoJS from '../config/crypto.ts'
import backUrl from '@/config/urlConfig.js'
import {
  showToast
} from '@nutui/nutui'

const encrypt = "1";
const getReqId = () => {
  const setReqId = () => Math.random().toString(32).slice(-8);
  let id = setReqId();
  for (; id.length < 32;)
    id += setReqId();
  id.slice(0, 32);
  return id
}

let requestUrl = 'https://api.migudm.cn/prep-portalx'
// if (window.location.hostname == "localhost") {
//   requestUrl = '/test'
// }

const toast = showToast.text('loading', {
  cover: true,
  duration: 0
})
toast.hide();

axios.interceptors.request.use(config => {
  config.url = requestUrl + config.url
  config.headers.encrypt = encrypt
  config.headers.reqId = getReqId()
  config.headers.timestamp = new Date().getTime()

  let encParam = config.url;
  let userInfo = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {}
  config.headers.sessionid = userInfo.sessionId || "";

  if (config.method == "get") {
    encParam = encParam.lastIndexOf("?") > 0 ? encParam.substr(encParam.lastIndexOf("?") + 1, encParam.length) : "";
    if (config.url.indexOf("/activity/configureId") > 0 || config.url.indexOf("/activity/detail") > 0) {
      config.headers.sessionid = ""
    }
  } else {
    if (config.url.indexOf("/activity/getAiEmoticons") > 0) {
      config.headers.sessionid = ""
    }
    if (encrypt == 1) {
      config.data = {
        body: CryptoJS.encrypt(JSON.stringify(config.data), "hounddefault2024")
      }
    }
    encParam = JSON.stringify(config.data)
  }
  // reqId+timestamp+sessionId+请求参数
  const signature = "".concat(config.headers.reqId).concat(config.headers.timestamp).concat(config.headers.sessionid).concat(encParam);
  config.headers.signature = CryptoJS.md5(signature);

  return config
}, error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  if (response.data.code == 500) {
    sessionStorage.removeItem("data");
    window.location.href = backUrl.homeUrl
  } else {
    let data = response.data
    if (encrypt == 1 && data.data) {
      try {
        data.data = JSON.parse(CryptoJS.decrypted(data.data, "hounddefault2024"))
      } catch (t) {
        console.log(t)
        console.log("解密失败", data.data)
      }
    }
    toast.hide()
    return data
  }

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
    url += i + '=' + (encrypt == 1 ? CryptoJS.encrypt(data[i], "hounddefault2024") : data[i])
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