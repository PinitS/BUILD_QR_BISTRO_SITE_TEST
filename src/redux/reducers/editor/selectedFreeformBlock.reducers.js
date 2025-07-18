import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: null,
};
export const slice = createSlice({
  name: "selectedFreeformBlock",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setSelectedFreeformBlock: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSelectedFreeformBlock } = slice.actions;

export default slice.reducer;
