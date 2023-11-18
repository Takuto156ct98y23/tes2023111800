import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../data/constants/network";

export const createNewMessage = async (data) => {
  return axios({
    method: "POST",

    url: `${REACT_APP_BACKEND_URL}/api/v1/messages`,

    data: data,
    withCredentials: true,
    credentials: "include",

    params: { createNewMessage: true },
  });
};
