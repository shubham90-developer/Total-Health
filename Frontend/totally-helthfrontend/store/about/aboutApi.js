import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/about",
  }),
  tagTypes: ["About"],
  endpoints: (builder) => ({
    getAboutApi: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["About"],
    }),
  }),
});

export const { useGetAboutApiQuery } = aboutApi;
