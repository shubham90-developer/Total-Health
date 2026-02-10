// services/aboutUsApi.ts

import { baseApi } from '@/services/baseApi'

export interface AboutUs {
  _id: string
  // General Information
  title: string
  subtitle: string
  banner: string
  infoTitle1?: string
  infoSubtitle1?: string
  infoTitle2?: string
  infoSubtitle2?: string
  aboutDescription: string

  // Founder Information
  founderTitle?: string
  founderImage?: string
  founderName?: string
  founderDesignation?: string
  founderDescription?: string

  // About Information
  aboutInfoTitle?: string
  aboutInfoSubtitle?: string
  isoCertificate?: string
  infoBanner1?: string
  infoBanner2?: string
  infoBanner3?: string
  aboutInfoDescription?: string

  additionalInfo?: {
    title?: string
    subtitle?: string
    description?: string
    images?: string[]
  }
  // Meta Options
  metaTitle: string
  metaKeyword: string
  metaDescription: string

  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface GetAboutUsResponse {
  success: boolean
  statusCode: number
  message: string
  data: AboutUs
}

export interface UpdateAboutUsResponse {
  success: boolean
  statusCode: number
  message: string
  data: AboutUs
}

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get About Us
    getAboutUs: build.query<AboutUs, void>({
      query: () => ({
        url: '/about-us',
        method: 'GET',
      }),
      transformResponse: (res: GetAboutUsResponse) => res?.data,
      providesTags: [{ type: 'AboutUs', id: 'SINGLE' }],
    }),

    // Update About Us
    updateAboutUs: build.mutation<AboutUs, FormData>({
      query: (data) => ({
        url: '/about-us',
        method: 'PUT',
        body: data,
      }),
      transformResponse: (res: UpdateAboutUsResponse) => res?.data,
      invalidatesTags: [{ type: 'AboutUs', id: 'SINGLE' }],
    }),
  }),
  overrideExisting: true,
})

export const { useGetAboutUsQuery, useUpdateAboutUsMutation } = aboutUsApi
