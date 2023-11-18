import { getObjects, patchData, postData } from "./apiGeneral";

export const createChatRoomRandomConfig = async (
  // chatLength,
  signal = null
) => {
  return postData(
    null,
    null,
    "chatRoomRandomConfig",
    // getPath(chatLength),
    signal
  );
};

export const getChatRoomRandomConfig = async (
  // chatLength,
  signal = null
) => {
  return getObjects(
    null,
    // getPath(chatLength),
    "chatRoomRandomConfig",
    signal
  );
};

export const updateChatRoomRandomConfig = async (
  // chatLength,
  reqQuery,
  reqBody,
  signal = null
) => {
  // return patchData(reqQuery, reqBody, getPath(chatLength), signal);
  return patchData({
    paramsObj: reqQuery,
    data: reqBody,
    // path: getPath(chatLength),
    path: "chatRoomRandomConfig",
    signal: signal,
  });
};

// const getPath = (chatLength) => {
//   let path = "chatRoomRandomConfig";
//   switch (chatLength) {
//     case chatRoomRandomConfigLength_Short:
//       // path += "Short";
//       path += "/short";
//       break;
//     case chatRoomRandomConfigLength_long:
//       // path += "Long";
//       path += "/long";
//       break;
//     default:
//   }
//   return path;
// };
