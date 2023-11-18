import { useNavigate } from "react-router-dom";
import classes from "./ButtonGoBack.module.css";

const ButtonGoBack = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={goBack} className={classes.ButtonGoBack}>
      戻る
    </button>
  );
};

export default ButtonGoBack;
