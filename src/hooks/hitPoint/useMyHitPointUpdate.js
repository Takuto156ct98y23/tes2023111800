import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { myHitPointSliceActions } from "../../store/hitPoint/myHitPoint-slice";
import {
  createAHitPoint,
  getMyHitPoint,
  updateMyHitPoint,
} from "../../api/apiHitPoint";
import { handleError, isGoodError } from "../../utils/utilsError";

const useMyHitPointUpdate = () => {
  const dispatch = useDispatch();

  const setData = useCallback(
    (myHitPoint) => {
      dispatch(myHitPointSliceActions.setData(myHitPoint));
    },
    [dispatch]
  );
  const renewCurrentHitPoints = useCallback(
    (currentHitPointsNew) => {
      dispatch(
        myHitPointSliceActions.renewCurrentHitPoints(currentHitPointsNew)
      );
    },
    [dispatch]
  );

  // restore <points> of life. -> pointsに正の値を入れる
  // deal <points> damage to me. -> pointsに負の値を入れる
  const addPointsToCurrentHitPoints = useCallback(
    (points) => {
      // ポイント加減。計算用
      dispatch(myHitPointSliceActions.addPoints(points));
    },
    [dispatch]
  );

  const setCurrentHitPointsDelta = useCallback(
    (points) => {
      // ポイント変動セット。演出用
      dispatch(myHitPointSliceActions.setCurrentHitPointsDelta(points));
    },
    [dispatch]
  );

  const setTextToDisplay = useCallback(
    (text) => {
      dispatch(myHitPointSliceActions.setTextToDisplay(text));
    },
    [dispatch]
  );

  // ローカルのcurrentHitPointsをサーバー側に反映する
  const updatePointsInDB = useCallback(async (points, signal = null) => {
    try {
      const reqQuery = null;
      const reqBody = { points: points };
      await updateMyHitPoint(reqQuery, reqBody, signal);
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, []);

  const getOrCreateMyHitPoint = useCallback(async () => {
    try {
      const res = await getMyHitPoint();
      const arrayWithHitPoint = res?.data?.data?.data;

      if (!arrayWithHitPoint || arrayWithHitPoint.length < 1) {
        const res = await createAHitPoint();
        setData(res?.data?.data?.data);
      } else {
        setData(arrayWithHitPoint[0]);
      }
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, [setData]);

  return {
    renewCurrentHitPoints,
    addPointsToCurrentHitPoints,
    setCurrentHitPointsDelta,
    updatePointsInDB,
    getOrCreateMyHitPoint,
    setTextToDisplay,
  };
};

export default useMyHitPointUpdate;
