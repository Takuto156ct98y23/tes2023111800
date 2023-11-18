import { createSlice } from "@reduxjs/toolkit";
import {
  userRole_guest,
  userRole_user,
} from "../../data/constants/userConstants";

const initialState = {
  me: null,
  meId: null,
  meRole: null,
  isGuest: null,
  languagePlusAndMinusAreTheSame: null,
};

const meSlice = createSlice({
  name: "meSlice",
  initialState: initialState,
  reducers: {
    renewMe(state, action) {
      const meNew = action.payload;
      state.me = meNew;
      state.meId = meNew ? meNew._id : null;
      state.meRole = meNew ? meNew.role : null;

      state.isUser = meNew ? state.meRole === userRole_user : null;
      state.isGuest = meNew ? state.meRole === userRole_guest : null;

      const languagePlus = meNew?.languagePlus;
      const languageMinus = meNew?.languageMinus;
      const isoCodeGooglePlus = languagePlus?.isoCodeGoogle;
      const isoCodeGoogleMinus = languageMinus?.isoCodeGoogle;
      const languagePlusAndMinusAreTheSame =
        isoCodeGooglePlus &&
        isoCodeGoogleMinus &&
        isoCodeGooglePlus === isoCodeGoogleMinus;
      state.languagePlusAndMinusAreTheSame =
        typeof languagePlusAndMinusAreTheSame === "boolean"
          ? languagePlusAndMinusAreTheSame
          : null;
    },
  },
});

export const meSliceActions = meSlice.actions;

export default meSlice.reducer;
