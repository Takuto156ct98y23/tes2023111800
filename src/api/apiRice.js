import { getObjects, patchData, postData } from "./apiGeneral";

// export const createARice = async (signal = null) => {
//   return postData(null, null, "rice", signal);
// };

export const getMyRicePoints = async (signal = null) => {
  return getObjects(null, "rice", signal);
};
export const getRicePointsOfTheRicesAsCompensation = async (signal = null) => {
  return getObjects(null, "rice/points-compensation", signal);
};

export const updateMyRice = async (reqQuery, reqBody, signal = null) => {
  // return patchData(reqQuery, reqBody, "rice", signal);
  return patchData({
    paramsObj: reqQuery,
    data: reqBody,
    path: "rice",
    signal: signal,
  });
};

export const fillRicePointsToMinimumDeposit = async (signal = null) => {
  return postData(null, null, "rice/minimum-deposit", signal);
};
