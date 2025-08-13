import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: { DESKTOP: [], MOBILE: [] },
};
export const slice = createSlice({
  name: "freeformBlocks",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setFreeformBlocks: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setFreeformBlocks } = slice.actions;

export default slice.reducer;
