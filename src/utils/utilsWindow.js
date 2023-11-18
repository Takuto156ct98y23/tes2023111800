import {
  windowWidthType_laptop,
  windowWidthType_laptopL,
  windowWidthType_mobileL,
  windowWidthType_mobileS,
  windowWidthType_tablet,
  windowWidth_px_laptop,
  // windowWidth_px_laptopL,
  windowWidth_px_mobileL,
  windowWidth_px_mobileS,
  windowWidth_px_tablet,
} from "../data/constants/windowDimensionsConstants";

export function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}
export function getWindowHeight() {
  const { innerHeight: height } = window;
  return height;
}
export function getWindowWidthType(windowWidth) {
  if (windowWidth < windowWidth_px_mobileS) {
    return windowWidthType_mobileS;
  } else if (windowWidth < windowWidth_px_mobileL) {
    return windowWidthType_mobileL;
  } else if (windowWidth < windowWidth_px_tablet) {
    return windowWidthType_tablet;
  } else if (windowWidth < windowWidth_px_laptop) {
    return windowWidthType_laptop;
  } else {
    return windowWidthType_laptopL;
  }
}
// export const getWidthContent = (windowWidthType) => {
//   switch (windowWidthType) {
//     case windowWidthType_mobileS:
//       return Math.round(windowWidth_px_mobileS);
//     case windowWidthType_mobileL:
//       return Math.round(windowWidth_px_mobileS);
//     case windowWidthType_tablet:
//       // return Math.round(windowWidth_px_tablet * 0.8);
//       return Math.round(500);
//     case windowWidthType_laptop:
//       return Math.round(windowWidth_px_tablet * 0.7);
//     case windowWidthType_laptopL:
//       return Math.round(windowWidth_px_laptop * 0.7);
//     default:
//       return Math.round(windowWidth_px_laptopL * 0.6);
//   }
// };
// export const getwidthContent__main = (widthContent) => {
//   return Math.round(widthContent * 0.9);
// };

// export const getWidthSidebarLeft = (windowWidthType) => {
//   switch (windowWidthType) {
//     case windowWidthType_mobileS:
//       return Math.round(windowWidth_px_mobileS * 0);
//     case windowWidthType_mobileL:
//       return Math.round(windowWidth_px_mobileS * 0);
//     case windowWidthType_tablet:
//       return Math.round(windowWidth_px_mobileL * 0);
//     case windowWidthType_laptop:
//       return Math.round(windowWidth_px_tablet * 0.25);
//     case windowWidthType_laptopL:
//       return Math.round(windowWidth_px_laptop * 0.25);
//     default:
//       return Math.round(windowWidth_px_laptopL * 0.2);
//   }
// };

export const reloadPage = () => {
  // ページをreload
  window.location.reload();
};
// 新しいタブでpathを開く
export const openNewTab = (path) => {
  window.open(path);
};
