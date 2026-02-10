import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const compareApi = createApi({
  reducerPath: "compareApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/compare",
  }),
  tagTypes: ["Compare"],
  endpoints: (builder) => ({
    getCompare: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Compare"],
    }),
  }),
});

export const { useGetCompareQuery } = compareApi;
