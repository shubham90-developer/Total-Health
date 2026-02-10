// healthApi.ts
import { baseApi } from '@/services/baseApi'

export type BenefitItem = {
  _id?: string
  icon: string
  text: string
  status: 'active' | 'inactive'
}

export type PartnerBenefits = {
  title: string
  subTitle: string
  image: string
}

export type BenefitSection = {
  title: string
  subtitle: string
  benefits: BenefitItem[]
}

export type WhyPartner = {
  title: string
  description: string
  video: string
}

export type Health = {
  _id: string
  PartnerinHealthBenefits: PartnerBenefits
  BenefitForCompanies: BenefitSection
  BenefitForEmployees: BenefitSection
  whyPartner: WhyPartner
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type HealthResponse = {
  success: boolean
  statusCode: number
  message: string
  data: Health
}

export type BenefitSectionResponse = {
  success: boolean
  statusCode: number
  message: string
  data: BenefitSection
}

export type BenefitItemResponse = {
  success: boolean
  statusCode: number
  message: string
  data: BenefitItem
}

export type DeleteResponse = {
  success: boolean
  statusCode: number
  message: string
  data: null
}

export type PartnerBenefitsResponse = {
  success: boolean
  statusCode: number
  message: string
  data: PartnerBenefits
}

export type WhyPartnerResponse = {
  success: boolean
  statusCode: number
  message: string
  data: WhyPartner
}

// Request types
export type UpdatePartnerBenefitsRequest = FormData
export type UpdateWhyPartnerRequest = {
  title?: string
  description?: string
  video?: string
}
export type CreateBenefitRequest = FormData
export type UpdateBenefitRequest = FormData

// ==================== API ENDPOINTS ====================
export const healthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== GET HEALTH ====================
    getHealth: builder.query<HealthResponse, void>({
      query: () => ({
        url: '/health-partner',
        method: 'GET',
      }),
      transformResponse: (response: HealthResponse) => response,
    }),

    // ==================== PARTNER IN HEALTH BENEFITS SECTION ====================
    updatePartnerBenefits: builder.mutation<PartnerBenefitsResponse, UpdatePartnerBenefitsRequest>({
      query: (formData) => ({
        url: '/health-partner/partner-benefits',
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response: PartnerBenefitsResponse) => response,
    }),

    // ==================== WHY PARTNER SECTION ====================
    updateWhyPartner: builder.mutation<WhyPartnerResponse, UpdateWhyPartnerRequest>({
      query: (data) => ({
        url: '/health-partner/why-partner',
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: WhyPartnerResponse) => response,
    }),

    // ==================== COMPANY BENEFITS ====================
    createCompanyBenefit: builder.mutation<BenefitItemResponse, CreateBenefitRequest>({
      query: (formData) => ({
        url: '/health-partner/company-benefits',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: BenefitItemResponse) => response,
    }),

    getAllCompanyBenefits: builder.query<BenefitSectionResponse, void>({
      query: () => ({
        url: '/health-partner/company-benefits',
        method: 'GET',
      }),
      transformResponse: (response: BenefitSectionResponse) => response,
    }),

    updateCompanyBenefit: builder.mutation<BenefitItemResponse, { benefitId: string; formData: UpdateBenefitRequest }>({
      query: ({ benefitId, formData }) => ({
        url: `/health-partner/company-benefits/${benefitId}`,
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response: BenefitItemResponse) => response,
    }),

    deleteCompanyBenefit: builder.mutation<DeleteResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/company-benefits/${benefitId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: DeleteResponse) => response,
    }),

    // ==================== EMPLOYEE BENEFITS ====================
    createEmployeeBenefit: builder.mutation<BenefitItemResponse, CreateBenefitRequest>({
      query: (formData) => ({
        url: '/health-partner/employee-benefits',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: BenefitItemResponse) => response,
    }),

    getAllEmployeeBenefits: builder.query<BenefitSectionResponse, void>({
      query: () => ({
        url: '/health-partner/employee-benefits',
        method: 'GET',
      }),
      transformResponse: (response: BenefitSectionResponse) => response,
    }),

    getEmployeeBenefitById: builder.query<BenefitItemResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'GET',
      }),
      transformResponse: (response: BenefitItemResponse) => response,
    }),

    updateEmployeeBenefit: builder.mutation<BenefitItemResponse, { benefitId: string; formData: UpdateBenefitRequest }>({
      query: ({ benefitId, formData }) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response: BenefitItemResponse) => response,
    }),

    deleteEmployeeBenefit: builder.mutation<DeleteResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: DeleteResponse) => response,
    }),
  }),
  overrideExisting: true,
})

export const {
  // Health
  useGetHealthQuery,
  useLazyGetHealthQuery,

  // Partner Benefits
  useUpdatePartnerBenefitsMutation,

  // Why Partner
  useUpdateWhyPartnerMutation,

  // Company Benefits
  useCreateCompanyBenefitMutation,
  useGetAllCompanyBenefitsQuery,
  useLazyGetAllCompanyBenefitsQuery,
  useUpdateCompanyBenefitMutation,
  useDeleteCompanyBenefitMutation,

  // Employee Benefits
  useCreateEmployeeBenefitMutation,
  useGetAllEmployeeBenefitsQuery,
  useLazyGetAllEmployeeBenefitsQuery,
  useGetEmployeeBenefitByIdQuery,
  useLazyGetEmployeeBenefitByIdQuery,
  useUpdateEmployeeBenefitMutation,
  useDeleteEmployeeBenefitMutation,
} = healthApi
