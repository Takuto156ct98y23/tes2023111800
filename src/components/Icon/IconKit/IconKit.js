import React, { useCallback } from "react";
import BadgeRedCircle from "../../Badge/BadgeRedCircle/BadgeRedCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./IconKit.module.css";
import AreaIcon from "../AreaIcon/AreaIcon";
import { useNavigate } from "react-router-dom";

const IconKit = ({
  icon,
  onClick = null,
  theNumberOfNotifications = null,
  link = null,
  // 背景の図形。circleかsquareかnull
  shape,
  // 図形の背景の色。
  backgroundColor,
  // 図形の色。
  color,
}) => {
  const navigate = useNavigate();
  const _onClickHandler = useCallback(async () => {
    if (onClick) {
      await onClick();
    }
    if (link) {
      navigate(`/${link}`);
    }
  }, [onClick, link, navigate]);
  return (
    <div className={classes.IconKit} onClick={_onClickHandler}>
      <BadgeRedCircle count={theNumberOfNotifications}>
        <AreaIcon
          className={classes.AreaIcon}
          shape={shape}
          backgroundColor={backgroundColor}
          color={color}
        >
          <FontAwesomeIcon className={classes.icon} icon={icon} />
        </AreaIcon>
      </BadgeRedCircle>
    </div>
  );
};

export default IconKit;
