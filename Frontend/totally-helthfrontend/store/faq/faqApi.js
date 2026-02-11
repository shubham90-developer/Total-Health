import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/faqs",
  }),
  tagTypes: ["Faq"],
  endpoints: (builder) => ({
    getFaq: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
  }),
});

export const { useGetFaqQuery } = faqApi;
