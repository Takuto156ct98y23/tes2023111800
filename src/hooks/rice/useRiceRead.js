import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ricePointsPerConversation,
  ricePointsPerTranslation,
} from "../../data/constants/riceConstants";

const useRiceRead = () => {
  const dataWithRice = useSelector((state) => {
    return state.myRiceReducer.dataWithRice;
  });
  const myRice = useSelector((state) => {
    return state.myRiceReducer.myRice;
  });

  // AIと会話できるだけの最低限のrice pointsがあるか？
  const hasRicePointsForAIConversation = useMemo(() => {
    if (myRice === null) {
      return null;
    }
    return typeof myRice === "number" && ricePointsPerConversation <= myRice;
  }, [myRice]);
  // 翻訳できるだけの最低限のrice pointsがあるか？
  const hasRicePointsForTranslation = useMemo(() => {
    if (myRice === null) {
      return null;
    }
    return typeof myRice === "number" && ricePointsPerTranslation <= myRice;
  }, [myRice]);

  return {
    dataWithRice,
    myRice,
    hasRicePointsForAIConversation,
    hasRicePointsForTranslation,
  };
};

export default useRiceRead;
