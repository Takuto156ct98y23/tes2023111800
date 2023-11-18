import { useMemo } from "react";
import classes from "./BadgeRedCircle.module.css";

const displayNumMaxBadgeRedCircle = 99;
const thresholdBadgeRedCircle = displayNumMaxBadgeRedCircle + 1;

// childrenの右上に赤丸で数字を表示。notification数の表示などで使える。
const BadgeRedCircle = ({ count, children }) => {
  const countStr = useMemo(() => {
    if (count < 1) {
      return null;
    } else if (1 <= count && count < thresholdBadgeRedCircle) {
      return `${count}`;
    } else if (thresholdBadgeRedCircle <= count) {
      return `+${displayNumMaxBadgeRedCircle}`;
    } else {
      return null;
    }
  }, [count]);

  return (
    <div className={classes.BadgeRedCircle}>
      {countStr ? (
        <div className={classes.circle}>
          <div className={classes.count}>{countStr}</div>
        </div>
      ) : null}
      <div className={classes.component}>{children}</div>
    </div>
  );
};
export default BadgeRedCircle;
