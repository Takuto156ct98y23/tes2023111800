import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../data/constants/network";

export const register = async ({
  // email,
  // password,
  // username,
  // name,
  // role = null,
  data,
  signal = null,
}) => {
  return axios({
    method: "POST",
    url: `${REACT_APP_BACKEND_URL}/api/v1/users/register`,
    // data: {
    //   email,
    //   password,
    //   username,
    //   name,
    //   role,
    // },
    data,
    withCredentials: true,
    credentials: "include",

    signal,
  });
};

// export const login = async (email, password) => {
export const login = async ({ emailOrUsername, password }) => {
  // https://stackoverflow.com/a/64144136
  return axios.post(
    `${REACT_APP_BACKEND_URL}/api/v1/users/login`,
    // { email: usernameOrEmail, password: password },
    { emailOrUsername, password },
    {
      withCredentials: true,
      credentials: "include",
    }
  );
};

export const logout = () => {
  return axios({
    method: "GET",

    url: `${REACT_APP_BACKEND_URL}/api/v1/users/logout`,
    withCredentials: true,
    credentials: "include",
  });
};

export const getLoginInfo = (signal = null) => {
  return axios({
    method: "GET",
    url: `${REACT_APP_BACKEND_URL}/api/v1/users/isLoggedIn`,
    withCredentials: true,
    credentials: "include",
    signal: signal,
  });
};
