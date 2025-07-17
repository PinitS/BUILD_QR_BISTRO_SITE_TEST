import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: true,
};
export const slice = createSlice({
  name: "isCollapseMenu",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setIsCollapseMenu: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setIsCollapseMenu } = slice.actions;

export default slice.reducer;
