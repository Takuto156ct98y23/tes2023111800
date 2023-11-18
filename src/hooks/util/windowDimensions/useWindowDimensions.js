import { useSelector } from "react-redux";
import {
  windowWidthType_laptop,
  windowWidthType_laptopL,
} from "../../../data/constants/windowDimensionsConstants";
import { useMemo } from "react";

/*
src\hooks\util\windowDimensions\useWindowDimensionsSetUp.js
の手続きで採取したデータを読むためのもの。ふだんはその
src\hooks\util\windowDimensions\useWindowDimensionsSetUp.js
ではなくこちらのuseWindowDimensionsを使う。
*/
export default function useWindowDimensions() {
  const windowWidth = useSelector((state) => {
    return state.windowDimensionsReducer.windowWidth;
  });
  const windowHeight = useSelector((state) => {
    return state.windowDimensionsReducer.windowHeight;
  });
  const windowWidthType = useSelector((state) => {
    return state.windowDimensionsReducer.windowWidthType;
  });
  // const widthContent = useSelector((state) => {
  //   return state.windowDimensionsReducer.widthContent;
  // });
  // const widthContent__main = useSelector((state) => {
  //   return state.windowDimensionsReducer.widthContent__main;
  // });
  // const widthSidebarLeft = useSelector((state) => {
  //   return state.windowDimensionsReducer.widthSidebarLeft;
  // });

  const displaySidebar = useMemo(() => {
    switch (windowWidthType) {
      case windowWidthType_laptop:
      case windowWidthType_laptopL:
        return true;
      default:
        return false;
    }
  }, [windowWidthType]);

  return {
    windowWidth,
    windowHeight,
    windowWidthType,
    displaySidebar,
    // windowHeightType,
    // widthContent,
    // widthContent__main,
    // widthSidebarLeft,
  };
}
