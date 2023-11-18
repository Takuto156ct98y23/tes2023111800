import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { languageDefaultSliceActions } from "../../../store/languageDefault/languageDefault-slice";

const useLanguageDefaultSetUp = () => {
  const dispatch = useDispatch();

  const setLanguageDefault = useCallback(
    ({ languageMinusCodeDefault, languagePlusCodeDefault }) => {
      dispatch(
        languageDefaultSliceActions.renewLanguageDefault({
          languageMinusCodeDefault,
          languagePlusCodeDefault,
        })
      );
    },
    [dispatch]
  );

  return {
    setLanguageDefault,
  };
};

export default useLanguageDefaultSetUp;
