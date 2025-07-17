import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_THEME_ASSETS } from "@static/DEFAULT_THEME_ASSETS";
import _ from "lodash";

const initialState = {
  data: DEFAULT_THEME_ASSETS,
};
export const slice = createSlice({
  name: "themeAssets",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setThemeAssets: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setThemeAssets } = slice.actions;

export default slice.reducer;
