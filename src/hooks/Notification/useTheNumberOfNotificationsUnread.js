import { useCallback, useEffect, useMemo, useState } from "react";
import { getTheNumberOfNotificationsUnread } from "../../api/apiNotification";
import useInitialLoad from "../Api/useInitialLoad";
import { getSocket } from "../../socket";
import { socketEventNameShouldRenewTheNumberOfNotificationsUnread } from "../../data/constants/socketConstants";
import useMakeMinimumAsyncCall from "../Api/useMakeMinimumAsyncCall";
import { handleError, isGoodError } from "../../utils/utilsError";

const useTheNumberOfNotificationsUnread = () => {
  const [
    res_TheNumberOfNotificationsUnread,
    setRes_TheNumberOfNotificationsUnread,
  ] = useState(null);
  const theNumberOfNotificationsUnread = useMemo(() => {
    return res_TheNumberOfNotificationsUnread
      ? res_TheNumberOfNotificationsUnread?.data?.data?.data
          ?.theNumberOfNotificationsUnread
      : null;
  }, [res_TheNumberOfNotificationsUnread]);

  const _getAndRenewTheNumberOfNotificationsUnread = useCallback(async () => {
    try {
      const res = await getTheNumberOfNotificationsUnread();
      setRes_TheNumberOfNotificationsUnread(res);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, []);

  useInitialLoad(
    // theNumberOfNotificationsUnreadはzero（falsy）になる可能性があるのでresで代用する
    res_TheNumberOfNotificationsUnread,
    _getAndRenewTheNumberOfNotificationsUnread,
    "useChatRoomRandomConfig"
  );

  const {
    callThisAsyncFuncMinimumAmount: getAndRenewTheNumberOfNotificationsUnread,
  } = useMakeMinimumAsyncCall(_getAndRenewTheNumberOfNotificationsUnread);
  useSocketTheNumberOfNotificationsUnread(
    getAndRenewTheNumberOfNotificationsUnread
  );

  return { theNumberOfNotificationsUnread };
};

export default useTheNumberOfNotificationsUnread;

const useSocketTheNumberOfNotificationsUnread = (
  getAndRenewTheNumberOfNotificationsUnread
) => {
  const socket = getSocket();

  // socket.on(
  //   socketEventNameShouldRenewTheNumberOfNotificationsUnread,
  //   getAndRenewTheNumberOfNotificationsUnread
  // );

  useEffect(() => {
    socket.on(
      socketEventNameShouldRenewTheNumberOfNotificationsUnread,
      getAndRenewTheNumberOfNotificationsUnread
    );
    return () => {
      socket.off(socketEventNameShouldRenewTheNumberOfNotificationsUnread);
    };
  }, [getAndRenewTheNumberOfNotificationsUnread, socket]);
};
