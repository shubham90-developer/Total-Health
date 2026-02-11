import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homeBannerApi = createApi({
  reducerPath: "homeBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/banners",
  }),
  tagTypes: ["HomeBanner"],
  endpoints: (builder) => ({
    getHomeBanner: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      provideTags: ["HomeBanner"],
    }),
  }),
});

export const { useGetHomeBannerQuery } = homeBannerApi;
