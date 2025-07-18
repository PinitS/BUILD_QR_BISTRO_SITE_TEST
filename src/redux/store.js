import { configureStore } from "@reduxjs/toolkit";
import isCollapseMenu from "@redux/reducers/editor/isCollapseMenu.reducers";
import activeMenu from "@redux/reducers/editor/activeMenu.reducers";
import modalAttribute from "@redux/reducers/base/modalAttribute.reducers";
import freeformBlocks from "@redux/reducers/editor/freeformBlocks.reducers";
import stackBlocks from "@redux/reducers/editor/stackBlocks.reducers";
import selectedFreeformBlock from "@redux/reducers/editor/selectedFreeformBlock.reducers";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    isCollapseMenu,
    activeMenu,
    modalAttribute,
    freeformBlocks,
    stackBlocks,
    selectedFreeformBlock,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
