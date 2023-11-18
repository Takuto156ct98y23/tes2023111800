import { getObjects, postData } from "./apiGeneral";

export const getMyUserView = async (signal = null) => {
  return getObjects(null, "user-view", signal);
};

export const createAUserView = async (signal = null) => {
  return postData(null, null, "user-view", signal);
};
