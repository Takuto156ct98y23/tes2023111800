import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeColorApp: null,
};

const themeColorAppSlice = createSlice({
  name: "themeColorAppSlice",
  initialState: initialState,
  reducers: {
    renewThemeColorApp(state, action) {
      state.themeColorApp = action.payload;
    },
  },
});
export const themeColorAppActions = themeColorAppSlice.actions;
export default themeColorAppSlice.reducer;

// themeColorApp
