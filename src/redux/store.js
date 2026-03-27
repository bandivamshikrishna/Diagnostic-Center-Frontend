import { configureStore } from "@reduxjs/toolkit";
import { userDetailsAPI } from "./apis/UserDetails";
import UserReducers from "./features/UserDetailsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { VendorAPI } from "./apis/Vendor";
import { GenericLovsAPI } from "./apis/GenericLovs";

export const store = configureStore({
  reducer: {
    [userDetailsAPI.reducerPath]: userDetailsAPI.reducer,
    [VendorAPI.reducerPath]: VendorAPI.reducer,
    [GenericLovsAPI.reducerPath]: GenericLovsAPI.reducer,
    userDetails: UserReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userDetailsAPI.middleware,
      VendorAPI.middleware,
      GenericLovsAPI.middleware,
    ),
});

setupListeners(store.dispatch);
