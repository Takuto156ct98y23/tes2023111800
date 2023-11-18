import classes from "./themeColorApp.module.css";

import { useEffect } from "react";
import {
  userThemeColorAppDark,
  userThemeColorAppDefault,
  userThemeColorAppLight,
} from "../../../data/constants/userConstants";

/*
  "src/App.css"の":root"の中にclasses.themeColorAppLightかclasses.themeColorAppDarkを出し入れすることでページ全体の色を変える。
  
  "src/App.css"の":root"の中には「var(--tes);」のようにして使う変数（のようなもの）を入れる。それを入れ替えることでページ全体の色を変える仕組み。
*/
const useSetThemeColorAppToRoot = (themeColorApp = null) => {
  useEffect(() => {
    const root = document.documentElement;
    switch (themeColorApp) {
      case userThemeColorAppDefault:
      case userThemeColorAppLight:
        root.classList.remove(classes.themeColorAppDark);
        root.classList.add(classes.themeColorAppLight);
        break;
      case userThemeColorAppDark:
        root.classList.remove(classes.themeColorAppLight);
        root.classList.add(classes.themeColorAppDark);
        break;
      default:
    }
  }, [themeColorApp]);
};

export default useSetThemeColorAppToRoot;
