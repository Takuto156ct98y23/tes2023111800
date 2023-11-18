import { getObjects, patchData, postData } from "./apiGeneral";

export const createAHitPoint = async (signal = null) => {
  return postData(null, null, "hitPoint", signal);
};

export const getMyHitPoint = async (signal = null) => {
  return getObjects(null, "hitPoint", signal);
};

export const updateMyHitPoint = async (reqQuery, reqBody, signal = null) => {
  // return patchData(reqQuery, reqBody, "hitPoint", signal);
  return patchData({
    paramsObj: reqQuery,
    data: reqBody,
    path: "hitPoint",
    signal: signal,
  });
};
