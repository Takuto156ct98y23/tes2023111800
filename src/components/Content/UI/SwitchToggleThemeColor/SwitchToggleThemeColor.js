import { useEffect } from "react";
import useToggleSwitch from "../../../../hooks/Button/useToggleSwitch";
import ToggleSwitch from "../../../button/ToggleSwitch/ToggleSwitch";
import classes from "./SwitchToggleThemeColor.module.css";
import {
  userThemeColorAppDark,
  userThemeColorAppLight,
} from "../../../../data/constants/userConstants";

import useThemeColorApp from "../../../../hooks/util/color/useThemeColorApp";

// ページ全体のテーマカラーを変える
const SwitchToggleThemeColor = () => {
  const { themeColorApp, toggleThemeColorAppBetweenLightAndDark } =
    useThemeColorApp();

  const { checked: usingLightTheme, setChecked: setUsingLightTheme } =
    useToggleSwitch({
      defaultChecked: themeColorApp === userThemeColorAppLight,
    });

  useEffect(() => {
    switch (themeColorApp) {
      case userThemeColorAppLight:
        setUsingLightTheme(true);
        break;
      case userThemeColorAppDark:
        setUsingLightTheme(false);
        break;
      default:
        setUsingLightTheme(true);
    }
  }, [themeColorApp, setUsingLightTheme]);

  return (
    <div className={classes.SwitchToggleThemeColor}>
      <div className={classes.ToggleSwitchWrapper}>
        <ToggleSwitch
          className={classes.ToggleSwitch}
          checked={usingLightTheme}
          setChecked={setUsingLightTheme}
          // handleToggle={handleToggle}
          backgroundColorChecked={
            // "#f3bf91"
            "paleOrange"
          }
          backgroundColorUnChecked={
            // "#05024c"
            "darkBlue"
          }
          funcOnChange={toggleThemeColorAppBetweenLightAndDark}
        />
      </div>
      <div className={classes.labelhWrapper}>
        <p className={classes.label}>明るさ</p>
      </div>
    </div>
  );
};

export default SwitchToggleThemeColor;
