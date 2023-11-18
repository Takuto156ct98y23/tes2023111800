import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../data/constants/network";

export const getObjects = async (paramsObj, path, signal) => {
  return axios({
    method: "GET",
    params: paramsObj,
    url: `${REACT_APP_BACKEND_URL}/api/v1/${path}`,
    withCredentials: true,
    credentials: "include",

    signal: signal,
  });
};

export const postData = async (paramsObj, data, path, signal) => {
  return axios({
    method: "POST",
    params: paramsObj,
    url: `${REACT_APP_BACKEND_URL}/api/v1/${path}`,

    data: data,
    withCredentials: true,
    credentials: "include",

    signal: signal,
  });
};
export const patchData = async (options = {}) => {
  const { paramsObj, data, path, headers, signal } = options;
  return axios({
    method: "PATCH",
    params: paramsObj,
    url: `${REACT_APP_BACKEND_URL}/api/v1/${path}`,

    data: data,

    headers: headers,

    withCredentials: true,
    credentials: "include",

    signal: signal,
  });
};
export const putData = async (paramsObj, data, path, signal) => {
  return axios({
    method: "PUT",
    params: paramsObj,
    url: `${REACT_APP_BACKEND_URL}/api/v1/${path}`,

    data: data,
    withCredentials: true,
    credentials: "include",

    signal: signal,
  });
};

export const deleteData = async (paramsObj, data, path, signal) => {
  return axios({
    method: "DELETE",
    params: paramsObj,
    url: `${REACT_APP_BACKEND_URL}/api/v1/${path}`,

    data: data,
    withCredentials: true,
    credentials: "include",

    signal: signal,
  });
};
