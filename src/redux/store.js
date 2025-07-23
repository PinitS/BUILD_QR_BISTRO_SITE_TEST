import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import selectedLayoutDesign from "@redux/reducers/selectedLayoutDesign.reducers";
import importBlockAttr from "@redux/reducers/importBlockAttr.reducers";
import freeformBlocks from "@redux/reducers/freeformBlocks.reducers";
import customizeBlockAttr from "@redux/reducers/customizeBlockAttr.reducers";

export const store = configureStore({
  reducer: { selectedLayoutDesign, importBlockAttr, freeformBlocks, customizeBlockAttr },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
