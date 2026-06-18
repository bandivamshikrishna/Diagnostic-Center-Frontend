import { createApi } from "@reduxjs/toolkit/query/react";
import { v4 as createUuid } from "uuid";
import { baseQueryWithReauth } from "./baseQuery";

export const userDetailsAPI = createApi({
  reducerPath: "userDetailsAPI",
  baseQuery: baseQueryWithReauth,
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
      transformResponse: () => {
        localStorage.removeItem("accessToken");
      },
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
      providesTags: ["users"],
    }),
    getSpecificUserDetails: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    activateOrDeActivateUser: builder.mutation({
      query: (id) => ({
        url: `user/activateOrDeactivate/${id}`,
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    unLockUser: builder.mutation({
      query: (id) => ({
        url: `user/unLock/${id}`,
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `user/update/${id}`,
        method: "PUT",
        body: user,
        credentials: "include",
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          uuid: createUuid(),
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "Users",
      ],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetCurrentUserDetailsQuery,
  useLogoutUserMutation,
  useGetUserRolesQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useActivateOrDeActivateUserMutation,
  useUnLockUserMutation,
  useGetSpecificUserDetailsQuery,
  useUpdateUserMutation,
} = userDetailsAPI;
