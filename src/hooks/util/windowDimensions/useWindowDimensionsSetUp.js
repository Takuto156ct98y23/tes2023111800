import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { windowDimensionsActions } from "../../../store/util/windowDimensions/windowDimensions-slice";
import useWindowDimensions from "./useWindowDimensions";

/*
データ採取の手続きを行う。手続きで採取したデータは
src\hooks\util\windowDimensions\useWindowDimensions.js
で読むことができる。
*/
const useWindowDimensionsSetUp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      dispatch(windowDimensionsActions.renewWindowWidth());
      dispatch(windowDimensionsActions.renewWindowHeight());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const { windowWidth } = useWindowDimensions();
  // windowWidthが１変化する度に再読み込みさせるのはやり過ぎな場合はこの大まかな値を使う。
  useEffect(() => {
    const timerIdWidth = setTimeout(() => {
      dispatch(windowDimensionsActions.renewWindowWidthType());
    }, 50);

    return () => {
      clearTimeout(timerIdWidth);
    };
  }, [windowWidth, dispatch]);

  // useEffect(() => {
  //   dispatch(windowDimensionsActions.renewWidthContent(windowWidthType));
  //   dispatch(windowDimensionsActions.renewWidthSidebarLeft(windowWidthType));
  // }, [dispatch, windowWidthType]);

  // useEffect(() => {
  //   dispatch(windowDimensionsActions.renewWidthContent__main());
  // }, [dispatch, widthContent]);
};
export default useWindowDimensionsSetUp;
