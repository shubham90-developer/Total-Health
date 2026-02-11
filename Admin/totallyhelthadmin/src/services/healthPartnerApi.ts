<<<<<<< HEAD
// healthApi.ts
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
    // ==================== GET HEALTH ====================
=======
    // ==================== GET HEALTH (Main endpoint) ====================
>>>>>>> origin/main
    getHealth: builder.query<HealthResponse, void>({
      query: () => ({
        url: '/health-partner',
        method: 'GET',
      }),
<<<<<<< HEAD
      transformResponse: (response: HealthResponse) => response,
=======
      providesTags: ['Health', 'CompanyBenefits', 'EmployeeBenefits'],
>>>>>>> origin/main
    }),

    // ==================== PARTNER IN HEALTH BENEFITS SECTION ====================
    updatePartnerBenefits: builder.mutation<PartnerBenefitsResponse, UpdatePartnerBenefitsRequest>({
      query: (formData) => ({
        url: '/health-partner/partner-benefits',
        method: 'PUT',
        body: formData,
      }),
<<<<<<< HEAD
      transformResponse: (response: PartnerBenefitsResponse) => response,
=======
      invalidatesTags: ['Health'],
>>>>>>> origin/main
    }),

    // ==================== WHY PARTNER SECTION ====================
    updateWhyPartner: builder.mutation<WhyPartnerResponse, UpdateWhyPartnerRequest>({
      query: (data) => ({
        url: '/health-partner/why-partner',
        method: 'PUT',
        body: data,
      }),
<<<<<<< HEAD
      transformResponse: (response: WhyPartnerResponse) => response,
=======
      invalidatesTags: ['Health'],
>>>>>>> origin/main
    }),

    // ==================== COMPANY BENEFITS ====================
    createCompanyBenefit: builder.mutation<BenefitItemResponse, CreateBenefitRequest>({
      query: (formData) => ({
        url: '/health-partner/company-benefits',
        method: 'POST',
        body: formData,
      }),
<<<<<<< HEAD
      transformResponse: (response: BenefitItemResponse) => response,
=======
      invalidatesTags: ['Health', 'CompanyBenefits'],
>>>>>>> origin/main
    }),

    getAllCompanyBenefits: builder.query<BenefitSectionResponse, void>({
      query: () => ({
        url: '/health-partner/company-benefits',
        method: 'GET',
      }),
<<<<<<< HEAD
      transformResponse: (response: BenefitSectionResponse) => response,
=======
      providesTags: ['CompanyBenefits'],
>>>>>>> origin/main
    }),

    updateCompanyBenefit: builder.mutation<BenefitItemResponse, { benefitId: string; formData: UpdateBenefitRequest }>({
      query: ({ benefitId, formData }) => ({
        url: `/health-partner/company-benefits/${benefitId}`,
        method: 'PUT',
        body: formData,
      }),
<<<<<<< HEAD
      transformResponse: (response: BenefitItemResponse) => response,
=======
      invalidatesTags: ['Health', 'CompanyBenefits'],
>>>>>>> origin/main
    }),

    deleteCompanyBenefit: builder.mutation<DeleteResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/company-benefits/${benefitId}`,
        method: 'DELETE',
      }),
<<<<<<< HEAD
      transformResponse: (response: DeleteResponse) => response,
=======
      invalidatesTags: ['Health', 'CompanyBenefits'],
>>>>>>> origin/main
    }),

    // ==================== EMPLOYEE BENEFITS ====================
    createEmployeeBenefit: builder.mutation<BenefitItemResponse, CreateBenefitRequest>({
      query: (formData) => ({
        url: '/health-partner/employee-benefits',
        method: 'POST',
        body: formData,
      }),
<<<<<<< HEAD
      transformResponse: (response: BenefitItemResponse) => response,
=======
      invalidatesTags: ['Health', 'EmployeeBenefits'],
>>>>>>> origin/main
    }),

    getAllEmployeeBenefits: builder.query<BenefitSectionResponse, void>({
      query: () => ({
        url: '/health-partner/employee-benefits',
        method: 'GET',
      }),
<<<<<<< HEAD
      transformResponse: (response: BenefitSectionResponse) => response,
=======
      providesTags: ['EmployeeBenefits'],
>>>>>>> origin/main
    }),

    getEmployeeBenefitById: builder.query<BenefitItemResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'GET',
      }),
<<<<<<< HEAD
      transformResponse: (response: BenefitItemResponse) => response,
=======
      providesTags: (result, error, benefitId) => [{ type: 'EmployeeBenefits', id: benefitId }],
>>>>>>> origin/main
    }),

    updateEmployeeBenefit: builder.mutation<BenefitItemResponse, { benefitId: string; formData: UpdateBenefitRequest }>({
      query: ({ benefitId, formData }) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'PUT',
        body: formData,
      }),
<<<<<<< HEAD
      transformResponse: (response: BenefitItemResponse) => response,
=======
      invalidatesTags: ['Health', 'EmployeeBenefits'],
>>>>>>> origin/main
    }),

    deleteEmployeeBenefit: builder.mutation<DeleteResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'DELETE',
      }),
<<<<<<< HEAD
      transformResponse: (response: DeleteResponse) => response,
=======
      invalidatesTags: ['Health', 'EmployeeBenefits'],
>>>>>>> origin/main
    }),
  }),
  overrideExisting: true,
})

<<<<<<< HEAD
=======
// ==================== EXPORT HOOKS ====================
>>>>>>> origin/main
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
