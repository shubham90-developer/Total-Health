import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const counterApi = createApi({
  reducerPath: "counterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/counter-page",
  }),
  tagTypes: ["Counter"],
  endpoints: (builder) => ({
    getCounter: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Counter"],
    }),
  }),
});

export const { useGetCounterQuery } = counterApi;
