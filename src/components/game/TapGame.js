import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { timeToMilliseconds } from "../../utils/utilsTime";
import classes from "./TapGame.module.css";
import useWindowDimensions from "../../hooks/util/windowDimensions/useWindowDimensions";

// 未完成

const TapGame = () => {
  const {
    intervalToDisplay,
    setIntervalToDisplay,
    movePrey,
    increaseIntervalToDisplay,
    decreaseIntervalToDisplay,
    parentAreaRef,
    preyStyle,
  } = usePrey();

  return (
    <div ref={parentAreaRef} className={classes.TapGame}>
      <p>{intervalToDisplay}</p>

      <Prey
        preyStyle={preyStyle}
        // widthInPxOfPrey={widthInPxOfPrey}
        // heightInPxOfPrey={heightInPxOfPrey}
        intervalToDisplay={intervalToDisplay}
        setIntervalToDisplay={setIntervalToDisplay}
        movePrey={movePrey}
        increaseIntervalToDisplay={increaseIntervalToDisplay}
        decreaseIntervalToDisplay={decreaseIntervalToDisplay}
      />
      <CircleComponent />
    </div>
  );
};
export default TapGame;

// Predator and prey

const getPxNumberStrFromString = (str) => {
  return typeof str === "string" ? str.replace("px", "") : null;
};
const getPxNumberFromString = (str) => {
  const numStr = getPxNumberStrFromString(str);
  return typeof numStr === "string" ? Number(numStr) : null;
};

const getNewSize = ({ prevSize, sizeMultiplier, minSize, maxSize }) => {
  const areNum =
    typeof prevSize === "number" &&
    typeof sizeMultiplier === "number" &&
    typeof minSize === "number" &&
    typeof maxSize === "number";
  if (!areNum) {
    return null;
  }
  let newSize = prevSize * sizeMultiplier;
  if (newSize < minSize) {
    newSize = minSize;
  }
  if (maxSize < newSize) {
    newSize = maxSize;
  }
  return newSize;
};

const getNewCoordinate = ({
  parentAreaSize,
  parentAreaDistanceFromEdge,
  preySize,
}) => {
  const areNum =
    typeof parentAreaSize === "number" &&
    typeof parentAreaDistanceFromEdge === "number" &&
    typeof preySize === "number";
  if (!areNum) {
    return null;
  }
  //  0.01にすることで、ギリギリの境界ラインを割り込まないようにする
  const padding = preySize * 0.01;
  const deltaMovable = parentAreaSize - (preySize + padding);
  const newCoordinate = Math.floor(
    parentAreaDistanceFromEdge + padding + Math.random() * deltaMovable
  );
  return newCoordinate;
};

const usePrey = () => {
  const shrinkRatePerClick = 0.4;
  const maxInterval = timeToMilliseconds(1, "second");
  const initialInterval = timeToMilliseconds(1, "second");
  // 本当はシステマチックにcomponentのwidthやheightからinitial、max、minのサイズを決めることもできるが、実務上重要性の観点から単純にpxをここに入力する形となっている（そのため、ここに300等の大きすぎる値についても入れることができる。それをやるとバグるが。）。
  const initialWidthInPxOfPrey = 200;
  const initialHeightInPxOfPrey = 200;
  const maxWidthInPxOfPrey = 200;
  const maxHeightInPxOfPrey = 200;
  const minWidthInPxOfPrey = maxWidthInPxOfPrey * 0.2;
  const minHeightInPxOfPrey = maxHeightInPxOfPrey * 0.2;
  const [intervalToDisplay, setIntervalToDisplay] = useState(initialInterval);

  const {
    targetRef: parentAreaRef,
    componentOffsetLeft,
    componentOffsetTop,
    componentOffsetHeight,
    componentOffsetWidth,
  } = useComponentSize();

  const [preyStyle, setPreyStyle] = useState({
    transition: "all 0.3s ease-in-out",
    height: "0",
    width: "0",
    top: "0",
    left: "calc(var(--width--App--center) * 1.5)",
    opacity: "0",
  });

  const movePrey = useCallback(
    ({
      // clickの度にpreyを大きくするならtrue
      makeBigger = true,
    }) => {
      setPreyStyle((prev) => {
        if (!prev) {
          return null;
        }
        const { width: widthStr, height: heightStr } = prev;

        const newTransition = `all ${intervalToDisplay / 1000}s ease-in-out`;

        const width = getPxNumberFromString(widthStr);
        const height = getPxNumberFromString(heightStr);

        const sizeMultiplier = makeBigger
          ? (1 / shrinkRatePerClick) * 0.5
          : shrinkRatePerClick;

        const prevWidth =
          typeof width === "number" && 0 < width
            ? width
            : initialWidthInPxOfPrey;
        const prevHeight =
          typeof height === "number" && 0 < height
            ? height
            : initialHeightInPxOfPrey;

        const newWidth = getNewSize({
          prevSize: prevWidth,
          sizeMultiplier,
          minSize: minWidthInPxOfPrey,
          maxSize: maxWidthInPxOfPrey,
        });

        const newHeight = getNewSize({
          prevSize: prevHeight,
          sizeMultiplier,
          minSize: minHeightInPxOfPrey,
          maxSize: maxHeightInPxOfPrey,
        });

        const newWidthStr = `${newWidth}px`;
        const newHeightStr = `${newHeight}px`;

        const x = getNewCoordinate({
          parentAreaSize: componentOffsetWidth,
          parentAreaDistanceFromEdge: componentOffsetLeft,
          preySize: newWidth,
        });

        const y = getNewCoordinate({
          parentAreaSize: componentOffsetHeight,
          parentAreaDistanceFromEdge: componentOffsetTop,
          preySize: newHeight,
        });

        const newLeftStr = `${x}px`;
        const newTopStr = `${y}px`;

        const newStyle = {
          transition: newTransition,
          width: newWidthStr,
          height: newHeightStr,
          left: newLeftStr,
          top: newTopStr,
          opacity: "1",
        };

        return newStyle;
      });
    },
    [
      componentOffsetHeight,
      componentOffsetLeft,
      componentOffsetTop,
      componentOffsetWidth,
      intervalToDisplay,
      minHeightInPxOfPrey,
      minWidthInPxOfPrey,
    ]
  );

  const millisecondsToBeIncreased = 100;
  const increaseIntervalToDisplay = useCallback(() => {
    setIntervalToDisplay((prev) => {
      const newInterval = prev + millisecondsToBeIncreased;
      if (newInterval < maxInterval) {
        return newInterval;
      } else {
        return maxInterval;
      }
    });
  }, [maxInterval]);

  const millisecondsToBeDecreased = 300;
  const decreaseIntervalToDisplay = useCallback(() => {
    setIntervalToDisplay((prev) => {
      const newInterval = prev - millisecondsToBeDecreased;
      if (newInterval < 0) {
        return 0;
      } else {
        return newInterval;
      }
    });
  }, []);

  return {
    intervalToDisplay,
    setIntervalToDisplay,
    movePrey,
    increaseIntervalToDisplay,
    decreaseIntervalToDisplay,
    parentAreaRef,
    preyStyle,
  };
};

const Prey = ({
  preyStyle,
  // widthInPxOfPrey,
  // heightInPxOfPrey,
  intervalToDisplay,
  // setIntervalToDisplay,
  movePrey,
  increaseIntervalToDisplay,
  decreaseIntervalToDisplay,
}) => {
  const onClickPrey = useCallback(() => {
    decreaseIntervalToDisplay();
    movePrey({ makeBigger: false });
  }, [decreaseIntervalToDisplay, movePrey]);

  const afterIntervalHandler = useCallback(() => {
    movePrey({ makeBigger: true });
    increaseIntervalToDisplay();
  }, [movePrey, increaseIntervalToDisplay]);
  useEffect(() => {
    const interval = setInterval(afterIntervalHandler, intervalToDisplay);

    return () => {
      clearInterval(interval);
    };
  }, [afterIntervalHandler, intervalToDisplay]);

  return (
    <div
      className={classes.Prey}
      id="moving-prey"
      style={preyStyle}
      onClick={onClickPrey}
    ></div>
  );
};

const useComponentSize = () => {
  // これをcomponentのrefに入れるとsizeを測れる
  const targetRef = useRef();

  // https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
  // 画面左端からcomponent左端までのpx
  const [componentOffsetLeft, setComponentOffsetLeft] = useState(null);
  // 画面上端からcomponent上端までのpx
  const [componentOffsetTop, setComponentOffsetTop] = useState(null);
  // componentの高さ（px）
  const [componentOffsetHeight, setComponentOffsetHeight] = useState(null);
  // componentの幅（px）
  const [componentOffsetWidth, setComponentOffsetWidth] = useState(null);

  const setDimensions = useCallback(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = target;

    setComponentOffsetHeight(offsetHeight);
    setComponentOffsetLeft(offsetLeft);
    setComponentOffsetTop(offsetTop);
    setComponentOffsetWidth(offsetWidth);
  }, []);

  useLayoutEffect(() => {
    setDimensions();
  }, [setDimensions]);

  const { windowWidthType } = useWindowDimensions();

  useEffect(() => {
    setDimensions();
  }, [setDimensions, windowWidthType]);

  return {
    targetRef,
    componentOffsetLeft,
    componentOffsetTop,
    componentOffsetHeight,
    componentOffsetWidth,
  };
};

const CircleComponent = () => {
  const [circle, setCircle] = useState({ x: 0, y: 0, visible: false });

  const handleClick = useCallback((e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    setCircle({ x: newX, y: newY, visible: true });
    setTimeout(() => {
      setCircle({ x: newX, y: newY, visible: false });
    }, 200);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [circle, handleClick]);

  return (
    <div
      className={classes.circle}
      style={{
        left: `${circle.x}px`,
        top: `${circle.y}px`,
        opacity: circle.visible ? 1 : 0,
      }}
    ></div>
  );
};
