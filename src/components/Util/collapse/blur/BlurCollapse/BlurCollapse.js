import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import IconKit from "../../../Icon/IconKit/IconKit";
// import BlurFilter from "../../BlurFilter/BlurFilter";
import classes from "./BlurCollapse.module.css";
import { useCallback, useState } from "react";
import BlurFilter from "../BlurFilter/BlurFilter";
import IconKit from "../../../../Icon/IconKit/IconKit";

const BlurCollapse = ({
  minHeight = "75px",
  maxHeightWhenClosed = "200px",
  isOpenInitial = false,

  // iconの背景の色。
  backgroundColor = null,
  // iconの色。
  color = null,

  children,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenInitial);

  const _onClickHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);
  return (
    <div
      className={`${classes.BlurCollapse} ${
        isOpen ? classes.wrapperOpened : classes.wrapperClosed
      }`}
      onClick={_onClickHandler}
    >
      <BlurFilter
        className={classes.BlurFilter}
        gradation={true}
        visibleHeight={isOpen ? 1 : 0.7}
      >
        <div
          className={`${classes.content} ${
            isOpen ? classes.contentOpened : classes.contentClosed
          }`}
          style={
            isOpen
              ? {
                  minHeight: minHeight,
                }
              : { minHeight: minHeight, maxHeight: maxHeightWhenClosed }
          }
        >
          <div className={classes.childrenWrapper}>
            {children}
            <div className={classes.childrenIcon}>
              {isOpen ? (
                <div className={classes.angleBasic}>
                  <div className={classes.angleUp}>
                    <IconKit
                      icon={faAngleUp}
                      backgroundColor={backgroundColor}
                      color={color}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </BlurFilter>

      {isOpen ? null : (
        <div className={classes.angleBasic}>
          <div className={classes.angleDown}>
            <IconKit
              icon={faAngleUp}
              backgroundColor={backgroundColor}
              color={color}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlurCollapse;
