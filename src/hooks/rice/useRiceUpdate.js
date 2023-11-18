import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { myRiceSliceActions } from "../../store/rice/myRice-slice";
import { getMyRicePoints } from "../../api/apiRice";
import { handleError, isGoodError } from "../../utils/utilsError";

const useRiceUpdate = () => {
  const dispatch = useDispatch();

  // const renewMyRice = useCallback(
  //   (myRice) => {
  //     dispatch(myRiceSliceActions.setMyRice(myRice));
  //   },
  //   [dispatch]
  // );

  const fetchAndRenewMyRice = useCallback(
    async (signal = null) => {
      try {
        const res = await getMyRicePoints(signal);

        const dataWithRice = res?.data?.data?.data;
        dispatch(myRiceSliceActions.setDataWithRice(dataWithRice));
        // setDataWithRice(dataWithRice);
      } catch (err) {
        handleError({ err });
        if (isGoodError(err)) {
          return;
        }
      }
    },
    [dispatch]
  );

  return {
    fetchAndRenewMyRice,
  };
};

export default useRiceUpdate;
