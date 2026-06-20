import { createApi } from "@reduxjs/toolkit/query/react";
import { v4 as createUuid } from "uuid";
import { baseQueryWithReauth } from "./baseQuery";

export const MedicalTestAPI = createApi({
  reducerPath: "MedicalTestAPI",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createMedicalTest: builder.mutation({
      query: (medicalTest) => ({
        url: "/medicaltest",
        method: "POST",
        credentials: "include",
        body: medicalTest,
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getMedicalTestLovs: builder.query({
      query: (type) => ({
        url: `medicaltest/lovs?type=${type}`,
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getMedicalTests: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        for (const key in filters) {
          if (filters[key] !== null && filters[key] !== "") {
            params.append(key, filters[key]);
          }
        }

        return {
          url: `/medicaltest?${params.toString()}`,
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            uuid: createUuid(),
          },
        };
      },
    }),
    activateOrDeActivateMedicalTest: builder.mutation({
      query: (id) => ({
        url: `medicaltest/activateOrDeactivate/${id}`,
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getSpecificMedicalTestDetails: builder.query({
      query: (id) => ({
        url: `medicaltest/${id}`,
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
      providesTags: (result, error, id) => [{ type: "Test", id }],
    }),
    updateMedicalTest: builder.mutation({
      query: ({ id, test }) => ({
        url: `medicaltest/${id}`,
        method: "PUT",
        body: test,
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Test", id },
        "Tests",
      ],
    }),
  }),
});

export const {
  useCreateMedicalTestMutation,
  useGetMedicalTestLovsQuery,
  useGetMedicalTestsQuery,
  useActivateOrDeActivateMedicalTestMutation,
  useGetSpecificMedicalTestDetailsQuery,
  useUpdateMedicalTestMutation
} = MedicalTestAPI;
