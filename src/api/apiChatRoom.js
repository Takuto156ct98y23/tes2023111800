import { handleError } from "../utils/utilsError";
import { getObjects, patchData, postData } from "./apiGeneral";
// import { createAUserGroup } from "./apiUserGroup";

export const getMyChatRooms = async (signal = null) => {
  try {
    const res = await getObjects(null, "chatRoom/my-chatroom-all", signal);

    return res?.data?.data?.data;
  } catch (err) {
    handleError({ err });
    // if (error.name !== "CanceledError") {
    // }
  }
};
export const getAChatRoom = async ({ chatRoomId, signal = null }) => {
  // try {
  const res = await getObjects(
    null,
    `chatRoom/my-chatroom/${chatRoomId}`,
    signal
  );

  const arrayWithAChatRoom = res?.data?.data?.data;

  return arrayWithAChatRoom && 0 < arrayWithAChatRoom.length
    ? arrayWithAChatRoom[0]
    : null;
};
export const getChatRoomForEveryone = async ({ signal = null }) => {
  // try {
  const res = await getObjects(null, "chatRoom/for-everyone", signal);

  const chatRoomForEveryone = res?.data?.data?.data;

  return chatRoomForEveryone ? chatRoomForEveryone : null;
};
export const getChatRoomMe = async ({ signal = null }) => {
  // try {
  const res = await getObjects(null, "chatRoom/me", signal);

  const chatRoomMe = res?.data?.data?.data;

  return chatRoomMe ? chatRoomMe : null;
};
export const getChatRoomWithAI = async ({ typeSub, signal = null }) => {
  // try {
  // const res = await getObjects(null, "chatRoom/ai", signal);

  const res = await getObjects(null, `chatRoom/ai/${typeSub}`, signal);

  const chatRoomWithAI = res?.data?.data?.data;

  return chatRoomWithAI ? chatRoomWithAI : null;
};

export const createAChatRoom = async ({
  // userIds,
  // name,
  // userGroup、userGroupSenderがnullの場合サーバー側で自動生成する
  // userGroup = null,
  // userGroupSender = null,
  // arasuzy = null,
  reqBody,
  signal = null,
}) => {
  const res = await postData(null, reqBody, "chatRoom", signal);

  return res?.data?.data?.data;
};

export const registerChatRoomRandom = (scope, typeSub, signal = null) => {
  return postData(null, null, `chatRoom/random/${scope}/${typeSub}`, signal);
};

export const updateAChatRoom = async ({
  reqData,
  chatRoomId,
  signal = null,
}) => {
  // const res = await patchData(null, reqData, `chatRoom/${chatRoomId}`, signal);
  const res = await patchData({
    paramsObj: null,
    data: reqData,
    path: `chatRoom/${chatRoomId}`,
    signal: signal,
  });

  return res?.data?.data?.data;
};

export const leaveChatRoomRandom = (
  // chatRoomId,
  signal = null
) => {
  return postData(
    null,
    null,
    `chatRoom/random-leave`,
    // `chatRoom/random-leave/${chatRoomId}`,
    signal
  );
};
