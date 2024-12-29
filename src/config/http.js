import axios from 'axios'
import { showToast } from '@nutui/nutui'

const requestUrl = 'http://112.48.155.26:8088/product/test'

const toast = showToast.text('loading', {
  cover: true,
  duration: 0
})
toast.hide();

axios.interceptors.request.use(config => {
    console.log('config', config)
    config.url = requestUrl + config.url
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


  export const getJson = (url, data = {}) => {
    return axios({
      method: 'GET',
      url: url,
      data,
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