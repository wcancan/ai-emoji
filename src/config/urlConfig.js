

// 打包配置

const env = 'prefe' // test pro prefe


const activityId = "a1868848519272112130" // 预发布环境
const url = "https://avatar.migudm.cn/prefe/" // 预发布环境
const requestUrl = "https://api.migudm.cn/prep-portalx" // 预发布环境

if(env == 'test') {
    activityId = "a1867443766334885889"
    url = "http://10.124.130.86:8088/h5/"
    requestUrl = "http://112.48.155.26:8088/product/test"
} else if (env == 'pro') {
    activityId = "a1870816073249378306"
    url = "https://avatar.migudm.cn/h5/"
    requestUrl = "https://api.migudm.cn/portalx"
} 
export default {
    activityId,
    requestUrl,
    homeUrl: url+ "newyear2025/",
    centerListUrl: url + 'newyear2025/?page=usercenter&tab=aigif',
    payBack: url + 'newyear2025_aigif'
}