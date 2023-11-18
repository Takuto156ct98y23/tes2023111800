import { getObjects } from "./apiGeneral";

export const getMyChatRoomRandomWaitingQueue = async (signal = null) => {
  return getObjects(null, "chatRoom/my-chatRoomRandomWaitingQueues", signal);
};
