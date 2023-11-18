import classes from "./CardMyRice.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useRiceRead from "../../../hooks/rice/useRiceRead";

const CardMyRice = () => {
  // const { myRice } = useMyRice();
  const { myRice } = useRiceRead();

  return (
    <div className={classes.CardMyRice}>
      {typeof myRice === "number" ? <AreaMyRicePoints myRice={myRice} /> : null}
    </div>
  );
};

export default CardMyRice;

const AreaMyRicePoints = ({ myRice }) => {
  const navigate = useNavigate();
  const _onClickHandler = useCallback(() => {
    if (navigate) {
      // navigate("/rice");
      window.open("/rice");
    }
  }, [navigate]);
  return (
    <div onClick={_onClickHandler} className={classes.AreaMyRicePoints}>
      <div className={classes.iconWapper}>
        <FontAwesomeIcon className={classes.icon} icon={faBowlFood} />
      </div>
      <div className={classes.myRicePointsWrapper}>
        <p className={classes.myRicePoints}>{myRice}</p>
        {/* <h2 className={classes.myRicePoints}>9999999</h2> */}
      </div>
    </div>
  );
};
