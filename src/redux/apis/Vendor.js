import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const VendorAPI = createApi({
  reducerPath: "VendorAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/admin`,
  }),
  endpoints: (builder) => ({
    createVendor: builder.mutation({
      query: (createVendorFormData) => ({
        url: "/vendor",
        method: "POST",
        credentials: "include",
        body: createVendorFormData,
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      }),
    }),
  }),
});

export const { useCreateVendorMutation } = VendorAPI;
