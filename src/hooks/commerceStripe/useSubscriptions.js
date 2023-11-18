import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../../api/apiCommerceStripe";
import { subscriptionsSliceActions } from "../../store/subscriptions/subscriptions-slice";
import { handleError, isGoodError } from "../../utils/utilsError";
import useInitialLoad from "../Api/useInitialLoad";

const useSubscriptions = () => {
  const dispatch = useDispatch();
  // subscribeしている商品
  const subscriptions = useSelector((state) => {
    return state.subscriptionsReducer.subscriptions;
  });

  // プレミアム会員ならtrue
  const amASubscriber = useSelector((state) => {
    return state.subscriptionsReducer.amASubscriber;
  });
  const amAPartialSubscriber = useSelector((state) => {
    return state.subscriptionsReducer.amAPartialSubscriber;
  });

  const notASubscriber = useMemo(() => {
    if (amASubscriber === true || amASubscriber === false) {
      return !amASubscriber;
    }
  }, [amASubscriber]);
  const notAPartialSubscriber = useMemo(() => {
    if (amAPartialSubscriber === true || amAPartialSubscriber === false) {
      return !amAPartialSubscriber;
    }
  }, [amAPartialSubscriber]);

  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);

  const fetchAndRenewSubscriptions = useCallback(
    async (signal) => {
      setLoadingSubscriptions(true);
      try {
        const res = await getSubscriptions(signal);
        // const subscriptions = res?.data?.subscriptions?.data;
        const subscriptions = res?.data?.data?.data;

        if (subscriptions) {
          dispatch(subscriptionsSliceActions.renewSubscriptions(subscriptions));
        } else {
          dispatch(subscriptionsSliceActions.renewSubscriptions([]));
        }
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }

      setLoadingSubscriptions(false);
    },
    [dispatch]
  );

  useInitialLoad(subscriptions, fetchAndRenewSubscriptions, "subscriptions");

  return {
    subscriptions,
    amASubscriber,
    amAPartialSubscriber,
    notASubscriber,
    notAPartialSubscriber,
    fetchAndRenewSubscriptions,
    loadingSubscriptions,
  };
};
export default useSubscriptions;
