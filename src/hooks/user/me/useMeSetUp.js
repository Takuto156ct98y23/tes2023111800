import { useCallback, useEffect } from "react";
import useInitialLoad from "../../Api/useInitialLoad";
import useMe from "./useMe";
import { checkFieldMe } from "../../../api/apiUser";
import useMakeMinimumAsyncCall from "../../Api/useMakeMinimumAsyncCall";
import { handleError } from "../../../utils/utilsError";

// meの活用はuseMeで行う。
const useMeSetUp = () => {
  const { me, fetchAndRenewMe } = useMe();
  useMeFieldCheck();
  useInitialLoad(me, fetchAndRenewMe, "me");
};

export default useMeSetUp;

// meのfieldとvalueに不備が無いかチェック。
// mongooseのschema変更時などに役立つ関数
const useMeFieldCheck = () => {
  const { me, fetchAndRenewMe } = useMe();

  const meFieldCheck = useCallback(
    async (signal = null) => {
      if (!me) {
        return;
      }
      try {
        const res = await checkFieldMe({ signal });
        const meUpdated = res?.data?.data?.data?.userUpdated;
        if (meUpdated) {
          // サーバーのデータをlocalに反映
          await fetchAndRenewMe(signal);
        }
      } catch (err) {
        handleError({ err });
      }
    },
    [fetchAndRenewMe, me]
  );

  const { callThisAsyncFuncMinimumAmount: call_meFieldCheck_MinimumAmount } =
    useMakeMinimumAsyncCall(meFieldCheck);
  useEffect(() => {
    if (!me) {
      return;
    }

    if (call_meFieldCheck_MinimumAmount) {
      call_meFieldCheck_MinimumAmount();
    }
  }, [call_meFieldCheck_MinimumAmount, me]);
};
