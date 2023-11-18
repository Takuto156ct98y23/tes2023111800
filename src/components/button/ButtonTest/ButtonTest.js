import { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import classes from "./ButtonTest.module.css";

const ButtonTest = () => {
  const navigate = useNavigate();
  const testJump = useCallback(() => {
    navigate("/test", { replace: false });
  }, [navigate]);

  return (
    <div className={classes.ButtonTest}>
      <button onClick={testJump}>テスト用ページへ</button>
    </div>
  );
};

export default ButtonTest;
