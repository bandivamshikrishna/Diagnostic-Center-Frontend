import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as createUuid } from "uuid";

export const userDetailsAPI = createApi({
  reducerPath: "userDetailsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userLoginData) => ({
        url: "/user/login",
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", uuid: createUuid() },
        body: userLoginData,
      }),
      transformResponse: async (response, meta) => {
        const accessToken = meta.response.headers.get("Authorization");
        if (accessToken) localStorage.setItem("accessToken", accessToken);
      },
    }),
    getCurrentUserDetails: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getUserNewAccessToken: builder.query({
      query: () => ({
        url: "/user/refreshToken",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: async (response, meta) => {
        const accessToken = meta.response.headers.get("Authorization");
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getUserRoles: builder.query({
      query: () => ({
        url: "/user/get-Roles",
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    createUser: builder.mutation({
      query: (createUser) => ({
        url: "/user/create",
        method: "POST",
        body: createUser,
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    getUsers: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();

        for (const key in filters) {
          if (filters[key] !== null && filters[key] !== "") {
            params.append(key, filters[key]);
          }
        }

        return {
          url: `/user?${params.toString()}`,
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            uuid: createUuid(),
          },
        };
      },
    }),
    getSpecificUserDetails: builder.query({
      query: (id) => ({
        url: "",
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
  useLoginUserMutation,
  useGetCurrentUserDetailsQuery,
  useLazyGetUserNewAccessTokenQuery,
  useLogoutUserMutation,
  useGetUserRolesQuery,
  useCreateUserMutation,
  useGetUsersQuery,
} = userDetailsAPI;
