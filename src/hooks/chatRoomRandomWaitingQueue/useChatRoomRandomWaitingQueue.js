import { useCallback, useMemo, useState } from "react";
import { handleError, isGoodError } from "../../utils/utilsError";
import { getMyChatRoomRandomWaitingQueue } from "../../api/apiChatRoomRandomWaitingQueue";
import useInitialLoad from "../Api/useInitialLoad";

const useChatRoomRandomWaitingQueue = (options = {}) => {
  const { stateToWatch = null } = options;

  const [chatRoomRandomWaitingQueue, setChatRoomRandomWaitingQueue] =
    useState(null);

  const chatRoomRandomWaitingQueueExists = useMemo(() => {
    if (!chatRoomRandomWaitingQueue) {
      return false;
    }
    const keysInChatRoomRandomWaitingQueue = Object.keys(
      chatRoomRandomWaitingQueue
    );
    return Array.isArray(keysInChatRoomRandomWaitingQueue) &&
      0 < keysInChatRoomRandomWaitingQueue.length
      ? true
      : false;
  }, [chatRoomRandomWaitingQueue]);
  const typeSub = useMemo(() => {
    return chatRoomRandomWaitingQueue?.typeSub;
  }, [chatRoomRandomWaitingQueue]);
  const typeSub01 = useMemo(() => {
    return chatRoomRandomWaitingQueue?.typeSub01;
  }, [chatRoomRandomWaitingQueue]);

  const [
    gettingChatRoomRandomWaitingQueue,
    setGettingChatRoomRandomWaitingQueue,
  ] = useState(false);

  const [
    haveErrorChatRoomRandomWaitingQueue,
    setHaveErrorChatRoomRandomWaitingQueue,
  ] = useState(false);

  const fetchChatRoomRandomWaitingQueue = useCallback(async (signal = null) => {
    setGettingChatRoomRandomWaitingQueue(true);
    try {
      const res = await getMyChatRoomRandomWaitingQueue(signal);
      const chatRoomRandomWaitingQueueArray =
        res?.data?.data?.data?.chatRoomRandomWaitingQueues;

      if (!Array.isArray(chatRoomRandomWaitingQueueArray)) {
        return;
      }
      if (chatRoomRandomWaitingQueueArray.length < 1) {
        setChatRoomRandomWaitingQueue({});
        return;
      }

      // 何かのミスで二個以上あるかもしれないが、一個しか考慮しない
      setChatRoomRandomWaitingQueue(chatRoomRandomWaitingQueueArray[0]);
      setHaveErrorChatRoomRandomWaitingQueue(false);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
      setHaveErrorChatRoomRandomWaitingQueue(true);
      // if (isBadError(err)) {
      //   console.log("err", err);
      //   setHaveErrorChatRoomRandomWaitingQueue(true);
      // }
    }
    setGettingChatRoomRandomWaitingQueue(false);
  }, []);

  useInitialLoad(
    chatRoomRandomWaitingQueue,
    fetchChatRoomRandomWaitingQueue,
    "useChatRoomRandomWaitingQueue",
    stateToWatch
  );

  return {
    chatRoomRandomWaitingQueue,
    chatRoomRandomWaitingQueueExists,
    typeSub,
    typeSub01,
    gettingChatRoomRandomWaitingQueue,
    haveErrorChatRoomRandomWaitingQueue,
    fetchChatRoomRandomWaitingQueue,
  };
};

export default useChatRoomRandomWaitingQueue;
