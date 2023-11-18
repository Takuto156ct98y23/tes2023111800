import { useCallback, useState } from "react";
import {
  getAChatRoom,
  getChatRoomForEveryone,
  getChatRoomMe,
  getChatRoomWithAI,
} from "../../api/apiChatRoom";
import useInitialLoad from "../Api/useInitialLoad";
import {
  chatRoomTypeSub_en,
  chatRoomTypeSub_enJa,
} from "../../data/constants/chatRoomConstants";
import { handleError, isGoodError } from "../../utils/utilsError";

const useChatRoom = (chatRoomId) => {
  const funcToFetchChatRoom = useCallback(
    async (signal = null) => {
      switch (chatRoomId) {
        case "for-everyone":
          return await getChatRoomForEveryone({ signal });
        case "me":
          return await getChatRoomMe({
            signal,
          });
        case "ai-enja":
          return await getChatRoomWithAI({
            typeSub: chatRoomTypeSub_enJa,
            signal,
          });
        case "ai-en":
          return await getChatRoomWithAI({
            typeSub: chatRoomTypeSub_en,
            signal,
          });
        default:
          return await getAChatRoom({
            chatRoomId: chatRoomId,
            signal: signal,
          });
      }
    },
    [chatRoomId]
  );

  const [chatRoom, setChatRoom] = useState(null);

  const fetchAndRenewChatRoom = useCallback(
    async (signal = null) => {
      try {
        const chatRoomFetched = await funcToFetchChatRoom(signal);
        if (!chatRoomFetched) {
          return;
        }
        setChatRoom(chatRoomFetched);
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    },

    [funcToFetchChatRoom]
  );

  useInitialLoad(chatRoom, fetchAndRenewChatRoom, "useChatRoom", chatRoomId);

  return { chatRoom, fetchAndRenewChatRoom };
};
export default useChatRoom;
