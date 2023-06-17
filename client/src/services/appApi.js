import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://talk-a-lot-backend.onrender.com",
  }),

  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/",
        method: "POST",
        mode: 'no-cors',
        body: user,
      }),
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),

    logoutUser: builder.mutation({
      query: (payload) => ({
        url: "/logout",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = appApi;

export default appApi;
