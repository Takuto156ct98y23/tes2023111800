import classes from "./HitPointBar.module.css";

import useMyHitPointRead from "../../../../hooks/hitPoint/useMyHitPointRead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import {
  maxHitPoint,
  secondsTransition,
} from "../../../../data/constants/hitPointConstants";
import { useNavigate } from "react-router-dom";

const HitPointBar = () => {
  const { currentHitPoints } = useMyHitPointRead();

  const { classNameHitPointBarFill, styleHitPointBarFill } =
    useHitPointBarFill(currentHitPoints);

  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/restore-hp");
  };
  return (
    <div className={classes.HitPointBar} onClick={onClickHandler}>
      <div className={classes.HitPointBarWrapper}>
        <div className={classes.Bar}>
          <div className={classes.HPIconWrapper}>
            <FontAwesomeIcon className={classes.HPIcon} icon={faHeart} />
          </div>
          <div className={classes.hitPointBarLabel}>
            <div className={classes.hitPointBarLabelWrapper}>
              {/* <div className={classes.hitPointBarLabelTextTop}>
                <p className={classes.hitPointBarLabelTextTopHP}>HP:</p>
              </div> */}

              <div className={classes.hitPointBarLabelTextCenter}>
                <div className={classes.hitPointBarLabelTextCenterTextBox}>
                  <p
                    className={classes.hitPointBarLabelTextCenterTextBox__label}
                  >
                    HP
                  </p>
                  <p
                    className={
                      classes.hitPointBarLabelTextCenterCurrentHitPoints
                    }
                  >
                    {`${currentHitPoints}`}
                  </p>
                </div>
              </div>
              {/* <div className={classes.hitPointBarLabelTextButtom}>
                <p
                  className={classes.hitPointBarLabelTextButtomMaxHitPoint}
                >{`/${maxHitPoint}`}</p>
              </div> */}
            </div>
          </div>
          <div className={classes.hitPointBarContainer}>
            <div
              className={classNameHitPointBarFill}
              style={styleHitPointBarFill}
            >
              <TextOnHPBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HitPointBar;

const TextOnHPBar = () => {
  const { currentHitPointsDelta, textToDisplay } = useMyHitPointRead();

  return (
    <div className={classes.TextOnHPBar}>
      <h3
        className={`${classes.TextOnHPBar__text} ${
          currentHitPointsDelta < 0
            ? classes.TextOnHPBar__text_minus
            : classes.TextOnHPBar__text_notMinus
        }`}
      >
        {textToDisplay}
      </h3>
    </div>
  );
};

const useHitPointBarFill = (currentHitPoints) => {
  const hitPointPercentage = useMemo(() => {
    return (currentHitPoints / maxHitPoint) * 100;
  }, [currentHitPoints]);

  const classNameHitPointBarFill = useMemo(() => {
    let name = `${classes.hitPointBarFill}`;

    if (currentHitPoints < 30) {
      name += ` ${classes.hitPointColor_veryBad}`;
    } else if (currentHitPoints < 40) {
      name += ` ${classes.hitPointColor_bad}`;
    } else if (currentHitPoints < 50) {
      name += ` ${classes.hitPointColor_medium}`;
    } else if (currentHitPoints < 80) {
      name += ` ${classes.hitPointColor_good}`;
    } else {
      name += ` ${classes.hitPointColor_veryGood}`;
    }

    return name;
  }, [currentHitPoints]);

  const styleHitPointBarFill = useMemo(() => {
    return {
      width: `${hitPointPercentage}%`,
      transition: `${secondsTransition}s linear`,
    };
  }, [hitPointPercentage]);

  return { classNameHitPointBarFill, styleHitPointBarFill };
};
