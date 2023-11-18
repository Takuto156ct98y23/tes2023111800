import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buttonDisabled: true,
  // formValueArasuzyPost: "",
  // editing: false,
};

const formSlice = createSlice({
  name: "formSlice",
  initialState: initialState,
  reducers: {
    setButonDisabled(state, action) {
      state.buttonDisabled = action.payload;
    },
    // startEditing(state) {
    //   state.editing = true;
    // },
    // endEditing(state) {
    //   state.editing = false;
    // },
  },
});

export const formSliceActions = formSlice.actions;

export default formSlice.reducer;
