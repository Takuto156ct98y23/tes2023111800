import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objects: null,
};

const objectsSlice = createSlice({
  name: "objectsSlice",
  initialState: initialState,
  reducers: {
    renewObjects(state, action) {
      state.objects = action.payload;
    },
    renewAnObject(state, action) {
      const payload = action.payload;
      state.objects[payload.index] = payload.newObj;
    },
  },
});

export const objectsSliceActions = objectsSlice.actions;

export default objectsSlice.reducer;
