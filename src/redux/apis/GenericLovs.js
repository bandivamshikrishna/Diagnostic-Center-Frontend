import { createApi } from "@reduxjs/toolkit/query/react";
import { v4 as createUuid } from "uuid";
import { baseQueryWithReauth } from "./baseQuery";

export const GenericLovsAPI = createApi({
  reducerPath: "GenericLovsAPI",
  baseQuery: baseQueryWithReauth,
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
