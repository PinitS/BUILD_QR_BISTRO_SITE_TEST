import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: null,
};
export const slice = createSlice({
  name: "modalAttribute",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setModalAttribute: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setModalAttribute } = slice.actions;

export default slice.reducer;
