// PointBarとセットで使う

import { useMemo } from "react";

const usePointBar = ({ currentPoints, maxPoint }) => {
  const pointPercentage = useMemo(() => {
    return (currentPoints / maxPoint) * 100;
  }, [currentPoints, maxPoint]);

  return { pointPercentage };
};

export default usePointBar;
