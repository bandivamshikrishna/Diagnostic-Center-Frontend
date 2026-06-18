import { configureStore } from "@reduxjs/toolkit";
import { userDetailsAPI } from "./apis/UserDetails";
import UserReducers from "./features/UserSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { VendorAPI } from "./apis/Vendor";
import { GenericLovsAPI } from "./apis/GenericLovs";
import { MedicalTestAPI } from "./apis/MedicalTest";

export const store = configureStore({
  reducer: {
    [userDetailsAPI.reducerPath]: userDetailsAPI.reducer,
    [VendorAPI.reducerPath]: VendorAPI.reducer,
    [GenericLovsAPI.reducerPath]: GenericLovsAPI.reducer,
    [MedicalTestAPI.reducerPath]: MedicalTestAPI.reducer,
    UserSlice: UserReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userDetailsAPI.middleware,
      VendorAPI.middleware,
      GenericLovsAPI.middleware,
      MedicalTestAPI.middleware,
    ),
});

setupListeners(store.dispatch);
