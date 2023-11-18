import { useEffect, useMemo } from "react";

// やや不完全なhookだが実務上まだ加筆してない

// 別ページに去る時にfuncBeforeLeavingPageを発動する
// アプリ自体を去る場合は発動しないので注意　→　useLeaveApp
const useLeaveAPage = (funcBeforeLeavingPage) => {
  const pageInitial = useMemo(() => {
    return window.location.href;
  }, []);

  useEffect(() => {
    return () => {
      if (pageInitial !== window.location.href) {
        if (funcBeforeLeavingPage) {
          funcBeforeLeavingPage();
        }
      }
    };
  }, [pageInitial, funcBeforeLeavingPage]);
};
export default useLeaveAPage;
