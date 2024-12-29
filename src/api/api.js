import * as Http from "../config/http";

/**
 * 消息推送
 * @param param
 * @returns {Promise}
 */
export const getEmojiList = (param) => {
  return Http.getJson(
    "/ProductPortal/tc/open/activity/configureId",
    param,
    false,
    true
  ).then(response => {
    return response;
  });
};

export const getDetail = (param) => Http.getJson(`/ProductPortal/tc/aiEmoticon/getDetail`, param)
export const getUserAsset = (param) => Http.getJson(`/ProductUser/tc/userAsset/query`, param)
export const subscribeChargingy = (param) => Http.postJson(`/ProductUser/tc/order/subscribeChargingy`, param)