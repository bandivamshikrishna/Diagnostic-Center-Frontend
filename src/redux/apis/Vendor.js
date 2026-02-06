import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const VendorAPI = createApi({
  reducerPath: "VendorAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/admin`,
  }),
  endpoints: (builder) => ({
    createVendor: builder.mutation({
      query: (createVendorData) => ({
        url: "/vendor",
        method: "POST",
        credentials: "include",
        body: createVendorData,
      }),
    }),
  }),
});

export const { useCreateVendorMutation } = VendorAPI;
    