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
    // ==================== GET HEALTH (Main endpoint) ====================
    getHealth: builder.query<HealthResponse, void>({
      query: () => ({
        url: '/health-partner',
        method: 'GET',
      }),
      providesTags: ['Health', 'CompanyBenefits', 'EmployeeBenefits'],
    }),

    // ==================== PARTNER IN HEALTH BENEFITS SECTION ====================
    updatePartnerBenefits: builder.mutation<PartnerBenefitsResponse, UpdatePartnerBenefitsRequest>({
      query: (formData) => ({
        url: '/health-partner/partner-benefits',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Health'],
    }),

    // ==================== WHY PARTNER SECTION ====================
    updateWhyPartner: builder.mutation<WhyPartnerResponse, UpdateWhyPartnerRequest>({
      query: (data) => ({
        url: '/health-partner/why-partner',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Health'],
    }),

    // ==================== COMPANY BENEFITS ====================
    createCompanyBenefit: builder.mutation<BenefitItemResponse, CreateBenefitRequest>({
      query: (formData) => ({
        url: '/health-partner/company-benefits',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Health', 'CompanyBenefits'],
    }),

    getAllCompanyBenefits: builder.query<BenefitSectionResponse, void>({
      query: () => ({
        url: '/health-partner/company-benefits',
        method: 'GET',
      }),
      providesTags: ['CompanyBenefits'],
    }),

    updateCompanyBenefit: builder.mutation<BenefitItemResponse, { benefitId: string; formData: UpdateBenefitRequest }>({
      query: ({ benefitId, formData }) => ({
        url: `/health-partner/company-benefits/${benefitId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Health', 'CompanyBenefits'],
    }),

    deleteCompanyBenefit: builder.mutation<DeleteResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/company-benefits/${benefitId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Health', 'CompanyBenefits'],
    }),

    // ==================== EMPLOYEE BENEFITS ====================
    createEmployeeBenefit: builder.mutation<BenefitItemResponse, CreateBenefitRequest>({
      query: (formData) => ({
        url: '/health-partner/employee-benefits',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Health', 'EmployeeBenefits'],
    }),

    getAllEmployeeBenefits: builder.query<BenefitSectionResponse, void>({
      query: () => ({
        url: '/health-partner/employee-benefits',
        method: 'GET',
      }),
      providesTags: ['EmployeeBenefits'],
    }),

    getEmployeeBenefitById: builder.query<BenefitItemResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'GET',
      }),
      providesTags: (result, error, benefitId) => [{ type: 'EmployeeBenefits', id: benefitId }],
    }),

    updateEmployeeBenefit: builder.mutation<BenefitItemResponse, { benefitId: string; formData: UpdateBenefitRequest }>({
      query: ({ benefitId, formData }) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Health', 'EmployeeBenefits'],
    }),

    deleteEmployeeBenefit: builder.mutation<DeleteResponse, string>({
      query: (benefitId) => ({
        url: `/health-partner/employee-benefits/${benefitId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Health', 'EmployeeBenefits'],
    }),
  }),
  overrideExisting: true,
})

// ==================== EXPORT HOOKS ====================
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
