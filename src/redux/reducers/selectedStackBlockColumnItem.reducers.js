import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: [],
};
export const slice = createSlice({
  name: "selectedStackBlockColumnItem",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setSelectedStackBlockColumnItem: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSelectedStackBlockColumnItem } = slice.actions;

export default slice.reducer;
