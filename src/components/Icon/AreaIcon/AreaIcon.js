import { useMemo } from "react";
import classes from "./AreaIcon.module.css";

// アイコン表示用の丸い円か正方形。その中心にアイコンを表示する。
const AreaIcon = ({
  // 背景の図形。circleかsquareかnull
  shape = "circle",
  // 図形の背景の色。
  backgroundColor = "light",
  // 図形の色。
  color = "dark",
  children,
}) => {
  const classNameAreaIcon = useMemo(() => {
    let name = `${classes.AreaIcon}`;

    switch (shape) {
      case "circle":
        name += ` ${classes.AreaIcon__shape_circle}`;
        break;
      case "square":
        name += ` ${classes.AreaIcon__shape_square}`;
        break;
      default:
        name += ` ${classes.AreaIcon__shape_circle}`;
    }

    switch (backgroundColor) {
      case "light":
        name += ` ${classes.AreaIcon__backgroundColor_light}`;
        break;
      case "dark":
        name += ` ${classes.AreaIcon__backgroundColor_dark}`;
        break;
      default:
        name += ` ${classes.AreaIcon__backgroundColor_light}`;
    }

    switch (color) {
      case "light":
        name += ` ${classes.AreaIcon__color_light}`;
        break;
      case "dark":
        name += ` ${classes.AreaIcon__color_dark}`;
        break;
      case "red":
        name += ` ${classes.AreaIcon__color_red}`;
        break;
      default:
        name += ` ${classes.AreaIcon__color_dark}`;
    }

    return name;
  }, [backgroundColor, color, shape]);

  return (
    <div className={classNameAreaIcon}>
      <div className={classes.iconContainer}>{children}</div>
    </div>
  );
};

export default AreaIcon;
