import { ERROR_MESSAGE_SHOULD_LOGIN_AGAIN } from "../data/constants/errorConstants";

export function isBadError(err) {
  let isBadErr = true;

  if (!err) {
    return isBadErr;
  }

  switch (err.message) {
    case "canceled":
      isBadErr = false;
      break;
    default:
  }

  const errorMessageInResponse = err.response?.data?.message;

  if (!errorMessageInResponse) {
    return isBadErr;
  }
  switch (errorMessageInResponse) {
    case "ERRCODE:82225":
      isBadErr = false;
      break;
    default:
  }

  return isBadErr;
}

// 最初にisBadError関数を作り、その後このisGoodError関数を作ったのでこんな変な実装になっているが、実務上の理由から手をつけていない
export const isGoodError = (err) => {
  return !isBadError(err);
};

export const handleError = ({ err }) => {
  try {
    if (
      err.response?.data?.data?.data?.message ===
      ERROR_MESSAGE_SHOULD_LOGIN_AGAIN
    ) {
      return window.location.replace("/login");
    }
  } catch (anotherError) {
    console.log({ anotherError });
  }
};
