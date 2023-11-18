// これの非asyncバージョンがsrc\hooks\function\useMakeMinimumCall.js

import { useCallback, useEffect, useRef, useState } from "react";

const useMakeMinimumAsyncCall = (
  asyncfunc,
  callBack,
  // timeToResetは少なくともかけてゆっくりと再度call可能に戻すなら
  timeToReset = null
) => {
  const [shouldCall, setShouldCall] = useState(false);
  const [finishedCalling, setFinishedCalling] = useState(false);

  const calling = useRef(false);
  const callThisAsyncFuncMinimumAmount = useCallback(() => {
    setShouldCall(true);
  }, []);

  const callAgain = useCallback(() => {
    setFinishedCalling(false);
    callThisAsyncFuncMinimumAmount();
  }, [callThisAsyncFuncMinimumAmount]);

  const resetStates = useCallback(() => {
    setShouldCall(false);
    setFinishedCalling(true);
    calling.current = false;
  }, []);

  const _callAsyncFunc = useCallback(
    async (signal = null) => {
      await asyncfunc(signal);

      if (timeToReset) {
        setTimeout(() => {
          resetStates();
        }, timeToReset);
      } else {
        resetStates();
      }

      if (callBack) {
        callBack();
      }
    },
    [asyncfunc, callBack, timeToReset, resetStates]
  );

  useEffect(() => {
    if (calling.current) {
      return;
    }
    if (shouldCall) {
      const controller = new AbortController();
      const { signal } = controller;

      calling.current = true;
      // _callAsyncFunc();
      _callAsyncFunc(signal);

      return () => {
        controller.abort();
      };
    }
  }, [_callAsyncFunc, shouldCall]);

  return {
    finishedCalling,
    setFinishedCalling,
    callThisAsyncFuncMinimumAmount,
    callAgain,
  };
};

export default useMakeMinimumAsyncCall;
