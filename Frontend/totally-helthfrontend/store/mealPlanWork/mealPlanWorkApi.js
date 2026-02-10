import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mealPlanWorkApi = createApi({
  reducerPath: "mealPlanWorkApi", // better naming
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/meal-plan-work",
  }),
  tagTypes: ["MealPlanWork"],
  endpoints: (builder) => ({
    getMealPlanWork: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["MealPlanWork"],
    }),
  }),
});

export const { useGetMealPlanWorkQuery } = mealPlanWorkApi;
