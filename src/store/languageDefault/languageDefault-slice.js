// languageDefault

// defaultの言語設定
// このアプリを始めて訪れた人がguestユーザーになる時設定される

// 注意：これはmeのlanguagePlusやMinusとは必ずしも一致しない
// あくまでもguestのlanguageの初期設定

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  languageMinusCodeDefault: "ja",
  languagePlusCodeDefault: "en",
};

const languageDefaultSlice = createSlice({
  name: "languageDefaultSlice",
  initialState: initialState,
  reducers: {
    renewLanguageDefault(state, action) {
      const languageDefaultsNew = action.payload;
      if (!languageDefaultsNew) {
        return;
      }

      const { languageMinusCodeDefault, languagePlusCodeDefault } =
        languageDefaultsNew;

      state.languageMinusCodeDefault = languageMinusCodeDefault;
      state.languagePlusCodeDefault = languagePlusCodeDefault;
    },
  },
});

export const languageDefaultSliceActions = languageDefaultSlice.actions;

export default languageDefaultSlice.reducer;
