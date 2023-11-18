import React, { useCallback } from "react";
import classes from "./FormButtonTemplate.module.css";
import ButtonBasic from "../../../button/Basic/ButtonBasic";

const FormButtonTemplate = ({ label, onClick, disabled = false }) => {
  const _onClickHandler = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  return (
    <div className={classes.FormButtonTemplate}>
      <ButtonBasic onClick={_onClickHandler} disabled={disabled}>
        {label}
      </ButtonBasic>
    </div>
  );
};

export default FormButtonTemplate;
