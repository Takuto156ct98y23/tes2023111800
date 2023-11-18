import { useEffect } from "react";
import {
  windowWidthType_laptop,
  windowWidthType_laptopL,
  windowWidthType_mobileL,
  windowWidthType_mobileS,
  windowWidthType_tablet,
} from "../../../data/constants/windowDimensionsConstants";
import useWindowDimensions from "../windowDimensions/useWindowDimensions";
import classes from "./responsiveDesign.module.css";

const classes__ResponsiveDesign = [
  classes.responsiveDesign__windowWidthType_mobileS,
  classes.responsiveDesign__windowWidthType_mobileL,
  classes.responsiveDesign__windowWidthType_tablet,
  classes.responsiveDesign__windowWidthType_laptop,
  classes.responsiveDesign__windowWidthType_laptopL,
];

/*
  "src/App.css"の":root"の中にclassesの要素を出し入れすることでページ全体のデザインを変える。
  
  "src/App.css"の":root"の中には「var(--tes);」のようにして使う変数（のようなもの）を入れる。それを入れ替えることでページ全体のデザインを変える仕組み。
  */

const useResponsiveDesign = () => {
  const { windowWidthType } = useWindowDimensions();

  useEffect(() => {
    const root = document.documentElement;
    switch (windowWidthType) {
      case windowWidthType_mobileS:
        root.classList.remove(...classes__ResponsiveDesign);
        root.classList.add(classes.responsiveDesign__windowWidthType_mobileS);
        break;
      case windowWidthType_mobileL:
        root.classList.remove(...classes__ResponsiveDesign);
        root.classList.add(classes.responsiveDesign__windowWidthType_mobileL);
        break;
      case windowWidthType_tablet:
        root.classList.remove(...classes__ResponsiveDesign);
        root.classList.add(classes.responsiveDesign__windowWidthType_tablet);
        break;
      case windowWidthType_laptop:
        root.classList.remove(...classes__ResponsiveDesign);
        root.classList.add(classes.responsiveDesign__windowWidthType_laptop);
        break;
      case windowWidthType_laptopL:
        root.classList.remove(...classes__ResponsiveDesign);
        root.classList.add(classes.responsiveDesign__windowWidthType_laptopL);
        break;

      default:
    }
  }, [windowWidthType]);
};

export default useResponsiveDesign;
