// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import isCollapseMenu from "@redux/reducers/editor/isCollapseMenu.reducers";
import activeMenu from "@redux/reducers/editor/activeMenu.reducers";
import modalAttribute from "@redux/reducers/base/modalAttribute.reducers";

import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    isCollapseMenu,
    activeMenu,
    modalAttribute,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
