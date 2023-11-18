import classes from "./AppLogo.module.css";
import { useCallback } from "react";
import useWindowDimensions from "../../../hooks/util/windowDimensions/useWindowDimensions";
import { useNavigate } from "react-router-dom";

const AppLogo = () => {
  const { displaySidebar } = useWindowDimensions();
  const navigate = useNavigate();
  const _onClickHandler = useCallback(() => {
    navigate("/");
  }, [navigate]);
  return (
    <div className={classes.AppLogo} onClick={_onClickHandler}>
      <p
        className={`${classes.AppLogoJP} ${
          displaySidebar
            ? classes.AppLogoJP_displaySidebar
            : classes.AppLogoJP_notDisplaySidebar
        }`}
      >
        ライスピーク
      </p>
      <p
        className={`${classes.AppLogoEN} ${
          displaySidebar
            ? classes.AppLogoEN_displaySidebar
            : classes.AppLogoEN_notDisplaySidebar
        }`}
      >
        RiceSpeak
      </p>
    </div>
  );
};

export default AppLogo;
