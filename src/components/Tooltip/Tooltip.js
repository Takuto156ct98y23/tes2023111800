import { Fragment } from "react";
import classes from "./Tooltip.module.css";

/*
（０）
以下のようにすると、componentの下にtooltipを表示する。
参考：https://www.w3schools.com/css/css_tooltip.asp

<p
  // browserのinspect画面だと作動しない
  onMouseEnter={onMouseEnterHandlerTooltip}
  onMouseLeave={onMouseLeaveHandlerTooltip}
>
  Hover over me
</p>
<Tooltip
  displayTextTooltip={displayTextTooltip}
  text={"クリックで置き換え"}
/>

（１）
useTooltipとセットで使う。

*/

const Tooltip = ({ displayTextTooltip, text }) => {
  return (
    <Fragment>
      {text && (
        <div className={classes.tooltip}>
          <p
            className={`${classes.tooltiptext} ${
              displayTextTooltip ? classes.tooltiptext_visible : null
            }`}
          >
            {text}
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default Tooltip;
