import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goalApi = createApi({
  reducerPath: "goalApi", // better naming
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/goals",
  }),
  tagTypes: ["Goal"],
  endpoints: (builder) => ({
    getGoals: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Goal"],
    }),
  }),
});

export const { useGetGoalsQuery } = goalApi;
