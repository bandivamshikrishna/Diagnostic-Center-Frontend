import { configureStore } from "@reduxjs/toolkit";
import { userDetailsAPI } from "./apis/UserDetails";


export const store = configureStore({
    reducer : {
        [userDetailsAPI.reducerPath] : userDetailsAPI.reducer,
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userDetailsAPI.middleware),
});