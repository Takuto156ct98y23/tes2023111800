import { useMemo } from "react";
import classes from "./BlurFilter.module.css";

// 背景（children）をぼやけさせる
const BlurFilter = ({
  // gradation効果を付けるならtrue（一方はくっきり見えて、その反対側はぼやけるような効果）
  gradation = false,
  // BlurFilterに覆われている部分をクリック可能にするならtrue。
  //   ぼやけてない部分はどちらにしろクリック可能
  clickable = true,

  // （gradationがtrueの場合適用）
  // 完全にぼやけてはいないエリア（くっきり見えるエリアではない）の割合。最大は１。
  // 注意：0～0.5は同じ結果になる。対策仕様と思えばできるが、やっていない。
  visibleHeight = 0.5,
  // （gradationがtrueの場合適用）
  // これはまだ使えない。幅も調整できるように一応変数を用意したが、未実装。
  visibleWidth = 1,
  // （gradationがtrueの場合適用）
  // 内容がぼやけずハッキリ見える場所。defaultはtop
  visibleArea = null,

  children,
}) => {
  const classNameBlur = useMemo(() => {
    let classNameBlurTo = "";
    if (gradation) {
      switch (visibleArea) {
        case "top":
          classNameBlurTo = classes.blurToTop;
          break;
        case "bottom":
          classNameBlurTo = classes.blurToBottom;
          break;
        case "right":
          classNameBlurTo = classes.blurToRight;
          break;
        case "left":
          classNameBlurTo = classes.blurToLeft;
          break;
        default:
          classNameBlurTo = classes.blurToTop;
      }
    }

    const classNameClickable = clickable ? `${classes.clickable}` : "";

    const strClassNameBlur = `${classes.blur} ${classNameBlurTo} ${classNameClickable}`;

    return strClassNameBlur;
  }, [gradation, visibleArea, clickable]);

  const maxRatioHeight = 100;
  const height = useMemo(() => {
    // heightの半分がぼやけることから導出した公式
    const _height = Math.round((2 - 2 * visibleHeight) * 100);
    return _height <= maxRatioHeight ? _height : maxRatioHeight;
  }, [visibleHeight]);

  // まだちゃんと実装してない。幅も調整するやつ。
  const maxRatioWidth = 100;
  const width = useMemo(() => {
    const _width = visibleWidth * 100;
    return _width <= maxRatioWidth ? _width : maxRatioWidth;
  }, [visibleWidth]);

  const styleVisibleRatio = useMemo(() => {
    return {
      height: `${height}%`,
      width: `${width}%`,
    };
  }, [height, width]);

  return (
    <div className={classes.BlurFilter}>
      <div className={classes.blurContainer}>
        <div className={classNameBlur} style={styleVisibleRatio}></div>
        {/* <div className={classes.content}>{children}</div> */}
        <div className={classes.content}>
          <div className={classes.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BlurFilter;
