// authApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1.1 Register
    registerUser: builder.mutation({
      query: ({ data }) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    // 1.5 Login
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),


  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = authApi;
