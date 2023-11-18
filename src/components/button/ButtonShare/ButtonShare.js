import { useDispatch, useSelector } from "react-redux";
import { putOrRemoveShare_and_renew } from "../../../store/arasuzy/arasuzy-actions";
import classes from "./ButtonShare.module.css";

const ButtonShare = (props) => {
  const dispatch = useDispatch();
  const idsharesBases = useSelector((state) => {
    return state.meReducer.idsharesBases;
  });

  let wrapperCss = `${classes.wrapper}`;
  if (idsharesBases.includes(props.arasuzyId)) {
    wrapperCss = `${classes.myShare}`;
  }

  const shareButtonHandler = () => {
    dispatch(putOrRemoveShare_and_renew(props.arasuzyId));
  };

  return (
    <div className={wrapperCss}>
      <button onClick={shareButtonHandler}>share</button>
    </div>
  );
};
export default ButtonShare;
