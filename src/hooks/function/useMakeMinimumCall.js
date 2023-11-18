// これのasyncバージョンがsrc\hooks\Api\useMakeMinimumAsyncCall.js

import { useCallback, useEffect, useRef, useState } from "react";

const useMakeMinimumCall = (func) => {
  const [shouldCall, setShouldCall] = useState(false);
  const [finishedCalling, setFinishedCalling] = useState(false);

  const calling = useRef(false);
  const callThisFuncMinimumAmount = useCallback(() => {
    setShouldCall(true);
  }, []);

  const _callFunc = useCallback(() => {
    if (func) {
      func();
    }
    setShouldCall(false);
    setFinishedCalling(true);
    calling.current = false;
  }, [func]);

  useEffect(() => {
    if (calling.current) {
      return;
    }
    if (shouldCall) {
      calling.current = true;
      _callFunc();
    }
  }, [_callFunc, shouldCall]);

  return { callThisFuncMinimumAmount, finishedCalling };
};

export default useMakeMinimumCall;
