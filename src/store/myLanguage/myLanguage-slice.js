import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myLanguage: null,
  isoCodeGoogle: null,
  isoCodeGoogles: null,
  nameEn: null,
  nameEnLowered: null,
  nameNative: null,
};

const myLanguageSlice = createSlice({
  name: "myLanguageSlice",
  initialState: initialState,
  reducers: {
    renewLanguage(state, action) {
      const myLanguageNew = action.payload;
      if (!myLanguageNew) {
        return;
      }
      state.myLanguage = myLanguageNew;

      const {
        isoCodeGoogle,
        isoCodeGoogles,
        nameEn,
        nameEnLowered,
        nameNative,
      } = myLanguageNew;

      state.isoCodeGoogle = isoCodeGoogle;
      state.isoCodeGoogles = isoCodeGoogles;
      state.nameEn = nameEn;
      state.nameEnLowered = nameEnLowered;
      state.nameNative = nameNative;
    },
  },
});

export const myLanguageSliceActions = myLanguageSlice.actions;

export default myLanguageSlice.reducer;
