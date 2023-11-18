import { createSlice } from "@reduxjs/toolkit";
import {
  maxHitPoint,
  minHitPoint,
} from "../../data/constants/hitPointConstants";

const initialState = {
  // ポイント等の情報が入ったオブジェクト
  myHitPoint: null,
  myHitPointId: null,
  // ポイント
  currentHitPoints: null,
  // ポイントの変動。（注意：ポイントはaddPointsWithinRangeで加減量が決まるが、addPointsWithinRangeのpointsDeltaとcurrentHitPointsDeltaは一致するとは限らない。currentHitPointsDeltaは無加工の変動量。）
  currentHitPointsDelta: 0,
  textToDisplay: null,
};

const myHitPointSlice = createSlice({
  name: "myHitPointSlice",
  initialState: initialState,
  reducers: {
    setData(state, action) {
      const myHitPointNew = action.payload;
      state.myHitPoint = myHitPointNew;
      if (!myHitPointNew) {
        return;
      }
      state.myHitPointId = myHitPointNew._id;
      state.currentHitPoints = convertPointsWithinRange(myHitPointNew.points);
    },
    renewCurrentHitPoints(state, action) {
      const currentHitPointsNew = action.payload;
      state.currentHitPoints = convertPointsWithinRange(currentHitPointsNew);
    },
    addPoints(state, action) {
      const points = action.payload;
      const currentHitPointsNew = addPointsWithinRange(
        state.currentHitPoints,
        points
      );
      state.currentHitPoints = currentHitPointsNew;
    },

    setCurrentHitPointsDelta(state, action) {
      state.currentHitPointsDelta = action.payload;
    },

    setTextToDisplay(state, action) {
      state.textToDisplay = action.payload;
    },
  },
});

export const myHitPointSliceActions = myHitPointSlice.actions;

export default myHitPointSlice.reducer;

const convertPointsWithinRange = (newPoints) => {
  if (newPoints < minHitPoint) {
    return minHitPoint;
  } else if (newPoints <= maxHitPoint) {
    return newPoints;
  } else {
    return maxHitPoint;
  }
};
const addPointsWithinRange = (pointsPrevious, pointsDelta) => {
  const newPoints = pointsPrevious + pointsDelta;
  return convertPointsWithinRange(newPoints);
};
