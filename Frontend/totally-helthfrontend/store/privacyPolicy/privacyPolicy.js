import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const privacyPolicyApi = createApi({
  reducerPath: "privacyPolicyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/privacy-policy",
  }),
  tagTypes: ["PrivacyPolicy"],
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["PrivacyPolicy"],
    }),
  }),
});

// ✅ You forgot this line
export const { useGetPrivacyPolicyQuery } = privacyPolicyApi;
