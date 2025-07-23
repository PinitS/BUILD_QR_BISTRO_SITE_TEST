import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: null,
};
export const slice = createSlice({
  name: "importBlockAttr",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setImportBlockAttr: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setImportBlockAttr } = slice.actions;

export default slice.reducer;
