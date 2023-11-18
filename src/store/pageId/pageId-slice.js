import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // keyは小文字にせよ
  pageId: {
    "/top": "arasuzy00000",
    "/following": "arasuzy00001",
    "/share": "arasuzy00002",
    // "": "arasuzy0000",

    "/chatroom": "chatroom0000",
    // "": "chatroom0000",
  },
};

const pageIdSlice = createSlice({
  name: "pageIdSlice",
  initialState: initialState,
  //   reducers: {
  //     renewPageId(state, action) {
  //       state.pageId = action.payload;
  //     },
  //   },
});

export const pageIdSliceActions = pageIdSlice.actions;

export default pageIdSlice.reducer;
