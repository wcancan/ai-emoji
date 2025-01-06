import * as amberTrackFh from '../config/amber.ts'
 
const appkey = ''
amberTrackFh.default.init(appkey)
let userInfo = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {};
let activity = sessionStorage.getItem("activity") ? JSON.parse(sessionStorage.getItem("activity")) : {};

export const amberTrack = (name, params) => {
    const data = {
        avatar_id: '', //用户形象ID
        onelv_chl: '', //一级渠道
        onelv_spot: '', //一级渠道触点
        // sec_chl: '',//二级渠道
        // sec_spot: '', //二级渠道触点
        // third_chl:  '', //三级渠道
        // third_spot: '', //三级渠道触点
        usr_phenu: '', //手机号
        pass_id: userInfo.passId, //用户ID（通过MUC传参获取）data
        page_name: '', //页面名称
        page_id: '', //页面标识
        module_name: '', //分模块名称
        page_type: '', //页面类型
        submodule_name: '', //子模块名称
        activity_id: activity.activityId, //活动ID
        ...params
    }

    amberTrackFh.default.track(name, data)
}