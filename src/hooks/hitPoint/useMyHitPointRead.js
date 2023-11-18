import { useSelector } from "react-redux";

const useMyHitPointRead = () => {
  const myHitPoint = useSelector((state) => {
    return state.myHitPointReducer.myHitPoint;
  });

  const currentHitPoints = useSelector((state) => {
    return state.myHitPointReducer.currentHitPoints;
  });

  const currentHitPointsDelta = useSelector((state) => {
    return state.myHitPointReducer.currentHitPointsDelta;
  });

  const textToDisplay = useSelector((state) => {
    return state.myHitPointReducer.textToDisplay;
  });

  return { myHitPoint, currentHitPoints, currentHitPointsDelta, textToDisplay };
};

export default useMyHitPointRead;
