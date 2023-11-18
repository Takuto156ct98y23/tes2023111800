import { useCallback, useEffect, useMemo } from "react";
import { markAsReadById } from "../../api/apiNotification";
import { handleError, isGoodError } from "../../utils/utilsError";
import useMakeMinimumAsyncCall from "../Api/useMakeMinimumAsyncCall";

// 既読を付ける
const useMarkAsRead = (notifications) => {
  const idInTheTail = useMemo(() => {
    if (!notifications) {
      return null;
    }
    if (notifications.length < 1) {
      return null;
    }
    const notificationInTheTail = notifications.slice(-1)[0];
    const id = notificationInTheTail ? notificationInTheTail._id : null;
    return id;
  }, [notifications]);

  const _markAsRead = useCallback(async () => {
    if (!idInTheTail) {
      return;
    }
    try {
      await markAsReadById(idInTheTail);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, [idInTheTail]);

  const { callThisAsyncFuncMinimumAmount: markAsRead } =
    useMakeMinimumAsyncCall(_markAsRead);

  useEffect(() => {
    if (idInTheTail) {
      markAsRead();
    }
  }, [notifications, idInTheTail, markAsRead]);
};

export default useMarkAsRead;
