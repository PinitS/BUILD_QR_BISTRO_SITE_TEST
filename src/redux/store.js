// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import restaurantDetails from "@redux/reducers/restaurantDetails.reducers";
import themeAssets from "@redux/reducers/themeAssets.reducers";
import guide from "@redux/reducers/guide.reducers";

export const store = configureStore({
  reducer: {
    restaurantDetails,
    themeAssets,
    guide,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
