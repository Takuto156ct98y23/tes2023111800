import { useCallback, useEffect, useMemo } from "react";
import { userThemeColorAppDefault } from "../../../data/constants/userConstants";
import useMe from "../../user/me/useMe";
import useThemeColorApp from "./useThemeColorApp";
import { updateMe } from "../../../api/apiUser";
import useMakeMinimumAsyncCall from "../../Api/useMakeMinimumAsyncCall";

const useThemeColorAppSyncWithMe = () => {
  const { me, fetchAndRenewMe } = useMe();
  const themeColorAppInMe = useMemo(() => {
    return me ? me.themeColorApp : null;
  }, [me]);

  const { themeColorApp, setThemeColorApp } = useThemeColorApp();

  useEffect(() => {
    // initialのsetupのままだったら
    if (themeColorApp === userThemeColorAppDefault) {
      setThemeColorApp(themeColorAppInMe);
    }
  }, [setThemeColorApp, themeColorApp, themeColorAppInMe]);

  const updateThemeColorAppInMe = useCallback(
    async (signal = null) => {
      if (themeColorApp === userThemeColorAppDefault) {
        return;
      }
      await updateMe({
        data: { themeColorApp: themeColorApp },
        signal,
      });
    },
    [themeColorApp]
  );

  const {
    callThisAsyncFuncMinimumAmount: call_updateThemeColorApp_MinimumAmount,
  } = useMakeMinimumAsyncCall(updateThemeColorAppInMe, fetchAndRenewMe);
  useEffect(() => {
    if (!themeColorApp) {
      return;
    }
    if (themeColorApp !== themeColorAppInMe) {
      call_updateThemeColorApp_MinimumAmount();
    }
  }, [
    call_updateThemeColorApp_MinimumAmount,
    themeColorApp,
    themeColorAppInMe,
  ]);
};

export default useThemeColorAppSyncWithMe;
