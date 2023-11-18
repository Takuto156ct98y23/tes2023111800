import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  specialString: null,
  specialStringLowered: null,
};

const hitPointDataSlice = createSlice({
  name: "hitPointDataSlice",
  initialState: initialState,
  reducers: {
    setSpecialString(state, action) {
      const newStr = action.payload;
      if (!newStr) {
        return;
      }
      state.specialString = newStr;
      state.specialStringLowered =
        typeof newStr === "string" ? newStr.toLowerCase() : null;
    },
  },
});

export const hitPointDataSliceActions = hitPointDataSlice.actions;

export default hitPointDataSlice.reducer;
