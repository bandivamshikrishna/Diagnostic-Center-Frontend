import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as createUuid } from "uuid";

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
          uuid: createUuid(),
        },
      }),
    }),

    getAllVendors: builder.query({
      query: () => ({
        url: "/vendor",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
      providesTags: ["vendors"],
    }),

    getSpecificVendorDetails: builder.query({
      query: (id) => ({
        url: `/vendor/${id}`,
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
      providesTags: ["vendors"],
    }),

    updateVendorDetails: builder.mutation({
      query: ({ id, vendorUpdateForm }) => ({
        url: `/vendor/${id}`,
        method: "PUT",
        credentials: "include",
        body: vendorUpdateForm,
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
      invalidatesTags: ["vendors"],
    }),

    vendorDropDown: builder.query({
      query: () => ({
        url: "/vendor/drop-down",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),

    vendorBranches: builder.query({
      query: (id) => ({
        url: `vendor/branches/${id}`,
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
  }),
});

export const {
  useCreateVendorMutation,
  useGetAllVendorsQuery,
  useGetSpecificVendorDetailsQuery,
  useUpdateVendorDetailsMutation,
  useVendorDropDownQuery,
  useVendorBranchesQuery,
} = VendorAPI;
