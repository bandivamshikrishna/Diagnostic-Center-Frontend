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
    getMedicalTestDepartmentLovs: builder.query({
      query: () => ({
        url: "medicaltest/lovs/departments",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getMedicalTestCategoriesLovs: builder.query({
      query: () => ({
        url: "medicaltest/lovs/categories",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getMedicalTestMethodsLovs: builder.query({
      query: () => ({
        url: "medicaltest/lovs/methods",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getMedicalTestSpecimensLovs: builder.query({
      query: () => ({
        url: "medicaltest/lovs/specimens",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getMedicalTestUnitsLovs: builder.query({
      query: () => ({
        url: "medicaltest/lovs/units",
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
  useCreateMedicalTestMutation,
  useGetMedicalTestDepartmentLovsQuery,
  useGetMedicalTestCategoriesLovsQuery,
  useGetMedicalTestMethodsLovsQuery,
  useGetMedicalTestSpecimensLovsQuery,
  useGetMedicalTestUnitsLovsQuery
} = MedicalTestAPI;
