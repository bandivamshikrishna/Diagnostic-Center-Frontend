import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as createUuid } from "uuid";

export const GenericLovsAPI = createApi({
  reducerPath: "GenericLovsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getSearchFilters: builder.query({
      query: (type) => ({
        url: `/lovs/${type}`,
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

export const { useGetSearchFiltersQuery } = GenericLovsAPI;
