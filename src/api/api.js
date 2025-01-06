import * as Http from "../config/http";

export const getEmojiList = (param) => Http.postJson(`/ProductPortal/tc/open/activity/getAiEmoticons`, param)
export const getDetail = (param) => Http.postJson(`/ProductPortal/tc/aiTemplate/detail`, param)
export const tokenValidate = (param) => Http.postJson(`/ProductUser/login/open/token/validate`, param)
export const getUserAsset = (param) => Http.postJson(`/ProductUser/tc/userAsset/query`, param)
export const subscribeCharging = (param) => Http.postJson(`/ProductUser/tc/order/subscribeCharging`, param)
export const getOrderStatus = (param) => Http.getJson(`/ProductUser/tc/order/getStatus`, param)
export const createEmoticon = (param) => Http.postJson(`/ProductPortal/tc/ai/emoticon/create`, param)
export const auditImage = (param) => Http.postJson(`/ProductPortal/tc/ai/audit/image`, param)
export const getMyEmoticon = (param) => Http.postJson(`/ProductPortal/tc/2025Spring/getEmoticon`, param)
export const retryTask = (param) => Http.postJson(`/ProductPortal/tc/aiEmoticon/retryTask`, param)
export const getActivityDetail = (param) => Http.getJson(`/ProductPortal/tc/open/activity/detail`, param)