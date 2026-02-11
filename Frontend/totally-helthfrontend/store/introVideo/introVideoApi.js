import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const introVideoApi = createApi({
  reducerPath: "introVideoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/videos",
  }),
  tagTypes: ["IntroVideo"],
  endpoints: (builder) => ({
    getIntroVideo: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["IntroVideo"],
    }),
  }),
});

export const { useGetIntroVideoQuery } = introVideoApi;
