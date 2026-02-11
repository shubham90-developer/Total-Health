import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/brands",
  }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),
  }),
});

export const { useGetBrandsQuery } = brandsApi;
