import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  envFromServer: null,
};

const envFromServerSlice = createSlice({
  name: "envFromServerSlice",
  initialState: initialState,
  reducers: {
    overwriteTheWholeObject(state, action) {
      state.envFromServer = action.payload;
    },
    overwriteAPart(state, action) {
      const newEnvs = action.payload;
      state.envFromServer = { ...state.envFromServer, ...newEnvs };
    },
  },
});

export const envFromServerSliceActions = envFromServerSlice.actions;

export default envFromServerSlice.reducer;
