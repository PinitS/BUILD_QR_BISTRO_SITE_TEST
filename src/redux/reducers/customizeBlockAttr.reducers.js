import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: null,
};
export const slice = createSlice({
  name: "customizeBlockAttr",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setCustomizeBlockAttr: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCustomizeBlockAttr } = slice.actions;

export default slice.reducer;
