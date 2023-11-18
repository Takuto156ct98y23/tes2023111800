import { useCallback, useState } from "react";
import { postData } from "../../api/apiGeneral";
import { handleError, isGoodError } from "../../utils/utilsError";

const useCreateContent = (options = {}) => {
  const { funcAfterSuccess = null } = options;
  const [sending, setSending] = useState(false);
  const [haveSendingError, setHaveSendingError] = useState(false);
  const [sendingStatus, setSendingStatus] = useState(null);
  const [restrictedUntil, setRestrictedUntil] = useState(null);

  const createObject = useCallback(
    async ({ pathPost, data, callback = null, signal = null }) => {
      if (sending) {
        return;
      }

      if (!data) {
        return;
      }
      // 何も入力されてないなら特に何もせず戻る
      if (!data.contentStr || data.contentStr.replace("\n", "") === "") {
        return;
      }

      setSending(true);

      try {
        const res = await postData(null, data, pathPost, signal);

        const resData = res?.data;
        const status = resData?.status;

        setSendingStatus(status);
        if (status === "success") {
          if (funcAfterSuccess) {
            funcAfterSuccess();
          }

          setTimeout(() => {
            // 元に戻す
            setSendingStatus(null);
          }, 5000);
        }

        setHaveSendingError(false);

        if (status === "NoHP") {
          const restrictedUntilInData = resData?.data?.data?.restrictedUntil;
          if (restrictedUntilInData) {
            setRestrictedUntil(restrictedUntilInData);
          }
        } else {
          if (callback) {
            callback();
          }
        }
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
        setHaveSendingError(true);
        // console.log("err", err);
        // if (err.message !== "canceled") {
        //   setHaveSendingError(true);
        // }
      }

      setSending(false);
    },
    [sending, funcAfterSuccess]
  );

  return {
    createObject,
    sending,
    haveSendingError,
    sendingStatus,
    restrictedUntil,
  };
};

export default useCreateContent;
