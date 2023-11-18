import { useCallback } from "react";
import { getMyLanguage } from "../../api/apiLanguage";
import { useDispatch } from "react-redux";
import { handleError } from "../../utils/utilsError";
import { myLanguageSliceActions } from "../../store/myLanguage/myLanguage-slice";

const useMyLanguageUpdate = () => {
  const dispatch = useDispatch();
  const fetchMyLanguage = useCallback(async () => {
    try {
      const res = await getMyLanguage();
      let languageMinus = res?.data?.data?.data;
      dispatch(myLanguageSliceActions.renewLanguage(languageMinus));
    } catch (err) {
      handleError({ err });
    }
  }, [dispatch]);

  return { fetchMyLanguage };
};

export default useMyLanguageUpdate;
