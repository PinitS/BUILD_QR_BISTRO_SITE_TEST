import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import selectedLayoutDesign from "@redux/reducers/selectedLayoutDesign.reducers";
import mainSideMenuAttr from "@redux/reducers/mainSideMenuAttr.reducers";
import freeformBlocks from "@redux/reducers/freeformBlocks.reducers";

export const store = configureStore({
  reducer: { selectedLayoutDesign, mainSideMenuAttr, freeformBlocks },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
