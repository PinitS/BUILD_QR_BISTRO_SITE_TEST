import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: [],
};
export const slice = createSlice({
  name: "stackBlocks",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setStackBlocks: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setStackBlocks } = slice.actions;

export default slice.reducer;
