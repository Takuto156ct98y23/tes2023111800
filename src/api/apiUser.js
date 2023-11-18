import axios from "axios";
import { getObjects, patchData } from "./apiGeneral";
import { userRole_guest } from "../data/constants/userConstants";
import { register } from "./apiAuth";
import { REACT_APP_BACKEND_URL } from "../data/constants/network";

// 自分の詳細ユーザー情報を一括で取得
export const getMe = async (signal = null) => {
  return axios({
    method: "GET",
    url: `${REACT_APP_BACKEND_URL}/api/v1/users/me`,
    withCredentials: true,
    credentials: "include",
    signal: signal,
  });
};

export const getUsers = async (usersPath) => {
  const res = await axios({
    method: "GET",
    url: `${REACT_APP_BACKEND_URL}/api/v1/users/` + usersPath,
    withCredentials: true,
    credentials: "include",
  });

  return res;
};

export const getAUser = async (targetUserId) => {
  return getObjects(null, `users/${targetUserId}/getAUser`, null);
};

// export const updateMe = async (data, signal = null) => {
export const updateMe = async (options = {}) => {
  const { data, headers, signal = null } = options;
  // return patchData(null, data, "users/me", signal);
  return patchData({
    data: data,
    path: "users/me",
    headers,
    signal: signal,
  });
};

// defaultで少なくとも何らかの値が入っているはずのfieldが空だったりしないかチェックする（もしそうだったらdefaultで埋める）
export const checkFieldMe = async (options = {}) => {
  const { signal = null } = options;
  return patchData({
    path: "users/check-field",
    signal: signal,
  });
};
export const updateMyProfilePic = async (options = {}) => {
  const { data, headers, signal = null } = options;
  // return patchData(null, data, "users/me", signal);
  return patchData({
    data: data,
    path: "users/myProfilePic",
    headers,
    signal: signal,
  });
};

export const createGuestUser = async (options = {}) => {
  const { data = {}, headers, signal = null } = options;

  if (!data) {
    return;
  }
  data.role = userRole_guest;

  return register({
    // data: {
    //   role: userRole_guest,
    // },
    data,
    headers,
    signal,
  });
};
