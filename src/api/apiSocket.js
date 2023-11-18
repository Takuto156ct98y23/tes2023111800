import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../data/constants/network";

export const setUpSocket = async () => {
  return axios({
    method: "GET",
    url: `${REACT_APP_BACKEND_URL}/api/v1/users/setup-socket`,
    withCredentials: true,
    credentials: "include",
  });
};
