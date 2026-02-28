import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Overview Data
    getOverview: builder.query({
      query: () => ({
        url: "/overview",
        method: "GET",
      }),
    }),

    // Get All Users
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),

    // Get Single User by ID
    getUserById: builder.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),

    // Get Analytics Data
    getAnalytics: builder.query({
      query: () => ({
        url: "/analytics",
        method: "GET",
      }),
    }),

    // Get All Products
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),

    // Get Single Product by ID
    getProductById: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),

    // Get Full Dashboard Data
    getDashboardAll: builder.query({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetAnalyticsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetDashboardAllQuery,
} = dashboardApi;