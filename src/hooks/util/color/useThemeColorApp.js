import { useCallback } from "react";
import {
  userThemeColorAppDark,
  userThemeColorAppLight,
} from "../../../data/constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { themeColorAppActions } from "../../../store/util/color/app/themeColorApp-slice";
import useSetThemeColorAppToRoot from "./useSetThemeColorAppToRoot";

const useThemeColorApp = () => {
  const dispatch = useDispatch();
  const themeColorApp = useSelector((state) => {
    return state.themeColorAppReducer.themeColorApp;
  });

  const setThemeColorApp = useCallback(
    (color) => {
      dispatch(themeColorAppActions.renewThemeColorApp(color));
    },
    [dispatch]
  );

  const toggleThemeColorAppBetweenLightAndDark = useCallback(() => {
    setThemeColorApp(
      themeColorApp === userThemeColorAppLight
        ? userThemeColorAppDark
        : userThemeColorAppLight
    );
  }, [themeColorApp, setThemeColorApp]);

  useSetThemeColorAppToRoot(themeColorApp);

  return {
    themeColorApp,
    setThemeColorApp,
    toggleThemeColorAppBetweenLightAndDark,
  };
};

export default useThemeColorApp;
