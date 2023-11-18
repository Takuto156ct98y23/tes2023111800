import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // myRiceId: null,
  dataWithRice: null,
  myRice: null,
};

const myRiceSlice = createSlice({
  name: "myRiceSlice",
  initialState: initialState,
  reducers: {
    setDataWithRice(state, action) {
      const dataWithRiceNew = action.payload;
      state.dataWithRice = dataWithRiceNew;
      state.myRice = dataWithRiceNew?.myRicePoints;
    },
    setMyRice(state, action) {
      const myRiceNew = action.payload;
      state.myRice = myRiceNew;
      // state.myRiceId = myRiceNew ? myRiceNew._id : null;
    },
  },
});

export const myRiceSliceActions = myRiceSlice.actions;

export default myRiceSlice.reducer;
