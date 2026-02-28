// authApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1.1–1.4 Register User ADMIN / USER)
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

    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetMeQuery,
  useLogOutMutation,
} = authApi;
