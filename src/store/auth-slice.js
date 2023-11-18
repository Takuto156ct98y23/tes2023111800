import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isAuthenticated: false,
  isAuthenticated: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    authenticate(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    // testtest(state) {
    //   console.log("state!!!", state);
    // },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
