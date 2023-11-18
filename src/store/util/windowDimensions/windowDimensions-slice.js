import { createSlice } from "@reduxjs/toolkit";
import {
  // getWidthContent,
  // getWidthSidebarLeft,
  getWindowHeight,
  getWindowWidth,
  getWindowWidthType,
  // getwidthContent__main,
} from "../../../utils/utilsWindow";

const windowWidthInitial = getWindowWidth();
const windowHeightInitial = getWindowHeight();
const windowWidthTypeInitial = getWindowWidthType(windowWidthInitial);
// const widthContentInitial = getWidthContent(windowWidthTypeInitial);
// const widthContent__mainInitial = getwidthContent__main(widthContentInitial);
// const widthSidebarLeftInitial = getWidthSidebarLeft(windowWidthTypeInitial);

const initialState = {
  windowWidth: windowWidthInitial,
  windowHeight: windowHeightInitial,
  windowWidthType: windowWidthTypeInitial,
  // widthContent: widthContentInitial,
  // // content直下（左右の枠等の内側）の幅
  // widthContent__main: widthContent__mainInitial,
  // widthSidebarLeft: widthSidebarLeftInitial,
};

const windowDimensionsSlice = createSlice({
  name: "windowDimensionsSlice",
  initialState: initialState,
  reducers: {
    renewWindowWidth(
      state
      // action
    ) {
      state.windowWidth = getWindowWidth();
    },
    renewWindowHeight(
      state
      // action
    ) {
      state.windowHeight = getWindowHeight();
    },

    // renewWidthContent(
    //   state
    //   // action
    // ) {
    //   state.widthContent = getWidthContent(state.windowWidthType);
    // },
    // renewWidthContent__main(
    //   state
    //   // action
    // ) {
    //   state.widthContent__main = getwidthContent__main(state.widthContent);
    // },
    // renewWidthSidebarLeft(
    //   state
    //   // action
    // ) {
    //   state.widthSidebarLeft = getWidthSidebarLeft(state.windowWidthType);
    // },

    renewWindowWidthType(
      state
      // action
    ) {
      state.windowWidthType = getWindowWidthType(state.windowWidth);
      // const windowWidthTypeNow = getWindowWidthType(state.windowWidth);
      // console.log(state.windowWidthType, windowWidthTypeNow);
      // if (state.windowWidthType !== windowWidthTypeNow) {
      //   state.windowWidthType = windowWidthTypeNow;
      //   this.renewWidthContent(windowWidthTypeNow);
      //   this.renewWidthSidebarLeft(windowWidthTypeNow);
      // }
    },
  },
});
export const windowDimensionsActions = windowDimensionsSlice.actions;
export default windowDimensionsSlice.reducer;

// windowDimensions
