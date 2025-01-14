import * as amberTrackFh from '../config/amber.ts'
 
const appkey = '37dbb209bb444f9bbdf86e72a1bed1b5'
const ACTIVITY_ID = {
    production: "a1870816073249378306",
    pre: "a1868848519272112130",
    stage: "a1868534867359473666",
    development: "a1867443766334885889",
}

amberTrackFh.default.init(appkey)
let dataParams = decodeURIComponent(atob(sessionStorage.getItem("8E93B6F0-90A8-4D3C-99C8-1D926FE1AB5E")))
let userInfo = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {};
let activity = sessionStorage.getItem("activity") ? JSON.parse(sessionStorage.getItem("activity")) : {};

export const amberTrack = (name, params) => {
    const data = {
        avatar_id: '', //用户形象ID, 不填
        style_id: "", // 不填
        onelv_chl: dataParams.onelv_chl, //一级渠道
        onelv_spot: dataParams.onelv_spot, //一级渠道触点
        sec_chl: dataParams.sec_chl,//二级渠道
        sec_spot: dataParams.sec_spot, //二级渠道触点
        third_chl:  dataParams.third_chl, //三级渠道
        third_spot: dataParams.third_spot, //三级渠道触点
        usr_phenu: userInfo.msisdn, //手机号
        pass_id: userInfo.passId, //用户ID（通过MUC传参获取）data
        page_name: '', //页面名称,页面路由
        page_id: '', //页面标识，页面路由
        module_name: '表情包', //分模块名称
        page_type: '二级页面', //页面类型
        submodule_name: '', //子模块名称
        activity_id: activity.activityId, //活动ID
        ...params
    }
    amberTrackFh.default.track(name, data)
}