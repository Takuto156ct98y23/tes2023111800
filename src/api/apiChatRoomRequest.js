import { getObjects, postData } from "./apiGeneral";

export const createChatRoomRequest = async (signal = null) => {
  return postData(null, null, "chatRoomRequest", signal);
};

export const getChatRoomRequestsFromMe = async (signal = null) => {
  return getObjects(null, "chatRoomRequest/from-me", signal);
};
