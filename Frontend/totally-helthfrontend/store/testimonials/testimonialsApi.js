import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testimonialsApi = createApi({
  reducerPath: "testimonialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/testimonials",
  }),
  tagTypes: ["Testimonials"],
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Testimonials"],
    }),
  }),
});

export const { useGetTestimonialsQuery } = testimonialsApi;
