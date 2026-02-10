import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const whyChooseApi = createApi({
  reducerPath: "whyChooseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/why-choose",
  }),
  tagTypes: ["whyChoose"],
  endpoints: (builder) => ({
    getWhyChooseUs: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["whyChoose"],
    }),
  }),
});

export const { useGetWhyChooseUsQuery } = whyChooseApi;
