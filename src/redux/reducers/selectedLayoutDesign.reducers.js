import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: "DESKTOP",
};
export const slice = createSlice({
  name: "selectedLayoutDesign",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setSelectedLayoutDesign: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSelectedLayoutDesign } = slice.actions;

export default slice.reducer;
