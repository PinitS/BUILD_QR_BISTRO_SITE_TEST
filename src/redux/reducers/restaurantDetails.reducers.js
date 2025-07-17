import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  data: null,
};
export const slice = createSlice({
  name: "restaurantDetails",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setRestaurantDetails: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRestaurantDetails } = slice.actions;

export default slice.reducer;
