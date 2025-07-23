import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import selectedLayoutDesign from "@redux/reducers/selectedLayoutDesign.reducers";

export const store = configureStore({
  reducer: { selectedLayoutDesign },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
