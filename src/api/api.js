import * as Http from "../config/http";

export const getEmojiList = (param) => Http.getJson(`/ProductPortal/tc/open/activity/configureId`, param)
export const getDetail = (param) => Http.getJson(`/ProductPortal/tc/aiEmoticon/getDetail`, param)
export const tokenValidate = (param) => Http.postJson(`/ProductUser/login/open/token/validate`, param)
export const getUserAsset = (param) => Http.postJson(`/ProductUser/tc/userAsset/query`, param)
export const subscribeChargingy = (param) => Http.postJson(`/ProductUser/tc/order/subscribeChargingy`, param)
export const getOrderStatus = (param) => Http.getJson(`/ProductUser/tc/order/getStatus`, param)
export const createEmoticon = (param) => Http.postJson(`/ProductPortal/tc/ai/emoticon/create`, param)
export const auditImage = (param) => Http.postJson(`/ProductPortal/tc/ai/audit/image`, param)