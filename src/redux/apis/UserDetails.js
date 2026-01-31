import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        headers: { "Content-Type": "application/json" },
        body: userLoginData,
      }),
      transformResponse: async (response, meta) => {
        const accessToken = meta.response.headers.get("Authorization");
        if (accessToken) localStorage.setItem("accessToken", accessToken);
      },
    }),
  }),
});

export const { useLoginUserMutation } = userDetailsAPI;
