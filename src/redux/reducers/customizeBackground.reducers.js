import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { MAIN_COLORS } from "statics/PAGE_BUILDER_STYLE";

const initialState = {
  data: {
    bodyType: "COLOR",
    bodyBackgroundImage: null,
    bodyBackgroundColor: "transparent",
    bodyAnimationType: null,
    bodyAnimationGradientFlowPrimary: "#FFFFFF",
    bodyAnimationGradientFlowSecondary: "#FAD0D7",
    containerBackgroundColor: MAIN_COLORS?.MAIN?.CONTAINER_BACKGROUND,
    containerBackgroundOpacity: 100,
  },
};
export const slice = createSlice({
  name: "customizeBackground",
  initialState: _.cloneDeep(initialState),
  reducers: {
    setCustomizeBackground: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCustomizeBackground } = slice.actions;

export default slice.reducer;
