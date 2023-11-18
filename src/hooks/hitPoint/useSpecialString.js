import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hitPointDataSliceActions } from "../../store/hitPoint/hitPointData-slice";

const useSpecialString = () => {
  const dispatch = useDispatch();
  const specialString = useSelector((state) => {
    return state.hitPointDataSliceReducer.specialString;
  });
  const specialStringLowered = useSelector((state) => {
    return state.hitPointDataSliceReducer.specialStringLowered;
  });

  const renewSpecialString = useCallback(
    (newString) => {
      dispatch(hitPointDataSliceActions.setSpecialString(newString));
    },
    [dispatch]
  );

  return { specialString, specialStringLowered, renewSpecialString };
};

export default useSpecialString;
