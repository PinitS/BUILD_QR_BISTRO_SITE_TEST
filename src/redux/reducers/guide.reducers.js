import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: 0,
};
export const slice = createSlice({
  name: "guide",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setGuide: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setGuide } = slice.actions;

export default slice.reducer;
