import { createSlice } from "@reduxjs/toolkit";

const initialstate = { connected: false };

const socketSlice = createSlice({
  name: "socketSlice",
  initialState: initialstate,
  reducers: {
    connected(state) {
      state.connected = true;
    },
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
