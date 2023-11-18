import { Fragment, useMemo } from "react";
import classes from "./CollapseReactCollapsed.module.css";

// useCollapseReactCollapsedとセットで使う。
const CollapseReactCollapsed = ({
  elementAsASwitch,

  //   これがtrueだと、expandする時に、直下の要素に覆いかぶさるように広がる。folseだと覆いかぶさらずに押し広げる。
  positionAbsolute = false,

  // マウスポインタが上に来たり、クリックされたりした場合にcollapseを閉じるためのoverlayを使いたいならtrue
  displayOverlayToCloseCollapse = false,

  // z-index効果を効かせたいならtrue
  withZIndex = true,

  // useCollapseReactCollapsedより。
  getCollapseProps,
  getToggleProps,
  isExpanded,
  toggleCollapse,
  closeCollapse,

  children,
}) => {
  const isReady = useMemo(() => {
    // if (!(getToggleProps && getCollapseProps)) {
    // }

    return getToggleProps && getCollapseProps ? true : false;
  }, [getCollapseProps, getToggleProps]);

  return (
    <Fragment>
      {isReady ? (
        <div
          className={
            // classes.CollapseReactCollapsed
            [
              classes.CollapseReactCollapsed,
              withZIndex ? classes.CollapseReactCollapsed_withZIndex : "",
            ].join(" ")
          }
        >
          <div
            className={classes.switch}
            {...getToggleProps({ onClick: toggleCollapse })}
          >
            {elementAsASwitch}
          </div>

          <div className={classes.childrenFrame}>
            <section
              {...getCollapseProps()}
              className={`${classes.childrenWrapper} ${
                positionAbsolute ? classes.positionAbsolute : null
              } `}
            >
              <div className={`${classes.children}`}>{children}</div>
            </section>
          </div>
        </div>
      ) : null}

      {displayOverlayToCloseCollapse && isExpanded ? (
        <OverlayToCloseCollapse
          closeCollapse={closeCollapse}
          withZIndex={withZIndex}
        />
      ) : null}
    </Fragment>
  );
};

export default CollapseReactCollapsed;

const OverlayToCloseCollapse = ({ closeCollapse, withZIndex }) => {
  return (
    <div
      className={
        // classes.OverlayToCloseCollapse
        [
          classes.OverlayToCloseCollapse,
          withZIndex ? classes.OverlayToCloseCollapse_withZIndex : "",
        ].join(" ")
      }
      onClick={closeCollapse}
      onMouseOver={closeCollapse}
    ></div>
  );
};
