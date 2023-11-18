import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myUserGroups: null,
};

const myUserGroupsSlice = createSlice({
  name: "myUserGroupsSlice",
  initialState: initialState,
  reducers: {
    renewMyUserGroups(state, action) {
      state.myUserGroups = action.payload;
    },
  },
});

export const myUserGroupsSliceActions = myUserGroupsSlice.actions;

export default myUserGroupsSlice.reducer;
