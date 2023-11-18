import { getObjects, patchData, postData } from "./apiGeneral";

export const createACommerceStripe = async (signal = null) => {
  return postData(null, null, "commerce-stripe", signal);
};

export const getMyCommerceStripe = async (signal = null) => {
  return getObjects(null, "commerce-stripe", signal);
};

export const getSubscriptions = async (signal = null) => {
  return getObjects(null, "commerce-stripe/get-subscription", signal);
};

// 未テスト。動くか不明。
export const updateMyCommerceStripe = async (
  reqQuery,
  reqBody,
  signal = null
) => {
  // return patchData(reqQuery, reqBody, "commerce-stripe", signal);
  return patchData({
    paramsObj: reqQuery,
    data: reqBody,
    path: "commerce-stripe",
    signal: signal,
  });
};
