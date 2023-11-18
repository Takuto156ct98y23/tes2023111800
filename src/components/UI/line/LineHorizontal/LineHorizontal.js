import { useMemo } from "react";
import classes from "./LineHorizontal.module.css";

const LineHorizontal = ({
  text = null,

  //   ".AreaRegisterOrLogin__line__border_default"を別内容に置き換えたいなら
  classNameLineBorder = "",

  //   ".LineHorizontal__AreaText__text_default"を別内容に置き換えたいなら
  classNameAreaText = "",
}) => {
  const cssLine = useMemo(() => {
    return [
      classes.AreaRegisterOrLogin__line,
      classNameLineBorder
        ? classNameLineBorder
        : classes.AreaRegisterOrLogin__line__border_default,
    ].join(" ");
  }, [classNameLineBorder]);

  const cssText = useMemo(() => {
    return [
      classes.LineHorizontal__AreaText__text,
      classNameAreaText
        ? classNameAreaText
        : classes.LineHorizontal__AreaText__text_default,
    ].join(" ");
  }, [classNameAreaText]);

  return (
    <div className={classes.LineHorizontal}>
      <hr className={cssLine} />
      {typeof text === "string" && 0 < text.length && (
        <div className={classes.LineHorizontal__AreaText}>
          <p className={cssText}>{text}</p>
        </div>
      )}
    </div>
  );
};

export default LineHorizontal;
