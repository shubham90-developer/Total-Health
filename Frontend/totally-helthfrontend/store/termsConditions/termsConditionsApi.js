import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const termsConditionsApi = createApi({
  reducerPath: "termsConditionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/terms-conditions",
  }),
  tagTypes: ["TermsConditions"],
  endpoints: (builder) => ({
    getTermsConditions: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["TermsConditions"],
    }),
  }),
});

export const { useGetTermsConditionsQuery } = termsConditionsApi;
