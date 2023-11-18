import { useCallback, useState } from "react";
import { createAUserView, getMyUserView } from "../api/apiUserView";
import useInitialLoad from "./Api/useInitialLoad";
import { handleError, isGoodError } from "../utils/utilsError";

// 今のところmyUserViewのDBへのcreateをする目的以外で使ってないhook。
const useMyUserView = () => {
  const [myUserView, setMyUserView] = useState(null);

  const getOrCreateMyUserView = useCallback(async () => {
    try {
      const res = await getMyUserView();
      const arrayWithUserView = res?.data?.data?.data;

      if (!arrayWithUserView || arrayWithUserView.length < 1) {
        const res = await createAUserView();
        setMyUserView(res?.data?.data?.data);
      } else {
        setMyUserView(arrayWithUserView[0]);
      }
    } catch (err) {
      handleError({ err });
      if (isGoodError(err)) {
        return;
      }
    }
  }, []);

  useInitialLoad(myUserView, getOrCreateMyUserView, "myUserView");

  return { myUserView };
};
export default useMyUserView;
