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