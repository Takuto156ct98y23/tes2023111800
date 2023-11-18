import { useMemo } from "react";
import classes from "./PointBar.module.css";

// usePointBarとセットで使う
// hpに限らず、HPのような「１００％中の何％か」というアニメーション表示に使える

// HitPointBarを基に作られたが、20230821現在、まだHitPointBar自体にはこれは使用されてない

const PointBar = ({
  pointPercentage,
  secondsTransition,
  textOnBar = null,
  applyAGradientEffect = true,
}) => {
  const classNamePointBarFill = useMemo(() => {
    const arrayClassNamePointBarFill = [classes.pointBarFill];

    if (applyAGradientEffect && typeof pointPercentage === "number") {
      if (pointPercentage < 30) {
        arrayClassNamePointBarFill.push(classes.pointColor_veryBad);
      } else if (pointPercentage < 40) {
        arrayClassNamePointBarFill.push(classes.pointColor_bad);
      } else if (pointPercentage < 50) {
        arrayClassNamePointBarFill.push(classes.pointColor_medium);
      } else if (pointPercentage < 80) {
        arrayClassNamePointBarFill.push(classes.pointColor_good);
      } else {
        arrayClassNamePointBarFill.push(classes.pointColor_veryGood);
      }
    } else {
      arrayClassNamePointBarFill.push(classes.pointColor_veryGood);
    }

    return arrayClassNamePointBarFill.join(" ");
  }, [applyAGradientEffect, pointPercentage]);

  const stylePointBarFill = useMemo(() => {
    return {
      width: `${pointPercentage}%`,
      transition: `${secondsTransition}s linear`,
    };
  }, [pointPercentage, secondsTransition]);

  return (
    <div className={classes.PointBar}>
      <div className={classes.PointBarWrapper}>
        <div className={classes.Bar}>
          <div className={classes.pointBarContainer}>
            <div className={classNamePointBarFill} style={stylePointBarFill}>
              {typeof textOnBar === "string" ||
                (typeof textOnBar === "number" && (
                  <TextOnBar text={`${textOnBar}`} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointBar;

const TextOnBar = ({ text, currentPointsDelta = 0 }) => {
  const pointsDecreasing = useMemo(() => {
    if (typeof currentPointsDelta !== "number") {
      return null;
    }
    return currentPointsDelta < 0;
  }, [currentPointsDelta]);
  return (
    <div className={classes.TextOnHPBar}>
      <h3
        className={`${classes.TextOnHPBar__text} ${
          pointsDecreasing
            ? classes.TextOnHPBar__text_minus
            : classes.TextOnHPBar__text_notMinus
        }`}
      >
        {
          // 強制非表示中
          false && text
        }
      </h3>
    </div>
  );
};
