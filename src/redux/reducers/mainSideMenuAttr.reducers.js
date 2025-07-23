import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: null,
};
export const slice = createSlice({
  name: "mainSideMenuAttr",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setMainSideMenuAttr: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setMainSideMenuAttr } = slice.actions;

export default slice.reducer;
