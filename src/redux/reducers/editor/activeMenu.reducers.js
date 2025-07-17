import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: true,
};
export const slice = createSlice({
  name: "activeMenu",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setActiveMenu: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setActiveMenu } = slice.actions;

export default slice.reducer;
