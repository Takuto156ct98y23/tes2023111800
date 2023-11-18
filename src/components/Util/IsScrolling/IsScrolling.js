import React, { forwardRef, useEffect, useRef } from "react";

/*
parentで以下のようにして使う。
const isScrolling = useRef(false);
・・・
<IsScrolling ref={isScrolling} />
*/

const IsScrolling = forwardRef((props, ref) => {
  const isScrolling = ref;
  const timeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      isScrolling.current = true;
      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        isScrolling.current = false;
        //isScrolling.currentをfalseに強制的に戻すまで（ユーザーがスクロールを終了したと判断するまで）の時間
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  return <div></div>;
});

export default IsScrolling;
