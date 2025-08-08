import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import selectedLayoutDesign from "@redux/reducers/selectedLayoutDesign.reducers";
import importBlockAttr from "@redux/reducers/importBlockAttr.reducers";
import freeformBlocks from "@redux/reducers/freeformBlocks.reducers";
import stackBlocks from "@redux/reducers/stackBlocks.reducers";
import customizeBlockAttr from "@redux/reducers/customizeBlockAttr.reducers";
import customizeBackground from "@redux/reducers/customizeBackground.reducers";
import selectedStackBlockColumnItem from "@redux/reducers/selectedStackBlockColumnItem.reducers";

export const store = configureStore({
  reducer: {
    selectedLayoutDesign,
    selectedStackBlockColumnItem,
    importBlockAttr,
    freeformBlocks,
    stackBlocks,
    customizeBackground,
    customizeBlockAttr,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
