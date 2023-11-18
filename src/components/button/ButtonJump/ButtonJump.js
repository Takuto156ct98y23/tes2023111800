import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./ButtonJump.module.css";
import ButtonBasic from "../Basic/ButtonBasic";
const ButtonJump = ({
  label,
  path,
  replace = false,
  disabled = false,
  className,
  children,
}) => {
  const navigate = useNavigate();

  const jumpToAPage = useCallback(() => {
    navigate(path, { replace: replace });
  }, [path, replace, navigate]);

  return (
    <div className={classes.ButtonJump}>
      <ButtonBasic
        onClick={jumpToAPage}
        disabled={disabled}
        className={className}
      >
        {label ? label : children}
      </ButtonBasic>
    </div>
  );
};

export default ButtonJump;
