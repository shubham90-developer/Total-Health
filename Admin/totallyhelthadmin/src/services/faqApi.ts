import { baseApi } from '@/services/baseApi'

// ==================== TYPES ====================

export type FAQItem = {
  _id: string
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export type FAQsResponse = {
  success: boolean
  statusCode: number
  message: string
  data: FAQItem[]
}

export type FAQResponse = {
  success: boolean
  statusCode: number
  message: string
  data: FAQItem
}

export type DeleteResponse = {
  success: boolean
  statusCode: number
  message: string
  data: FAQItem
}

export type GenerateAnswerResponse = {
  success: boolean
  statusCode: number
  message: string
  data: {
    question: string
    answer: string
  }
}

// Request types
export type CreateFAQRequest = {
  question: string
  answer: string
  category?: string
  order?: number
  isActive?: boolean
}

export type UpdateFAQRequest = Partial<CreateFAQRequest>

// ==================== API ENDPOINTS ====================
export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all FAQs
    getAllFAQs: builder.query<FAQsResponse, { active?: boolean; category?: string } | void>({
      query: (params) => ({
        url: '/faqs',
        method: 'GET',
        params: params ?? {},
      }),
      providesTags: ['FAQs'],
    }),

    // Get single FAQ by ID
    getFAQById: builder.query<FAQResponse, string>({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'FAQs', id }],
    }),

    // Create FAQ
    createFAQ: builder.mutation<FAQResponse, CreateFAQRequest>({
      query: (data) => ({
        url: '/faqs',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FAQs'],
    }),

    // Update FAQ
    updateFAQ: builder.mutation<FAQResponse, { id: string; data: UpdateFAQRequest }>({
      query: ({ id, data }) => ({
        url: `/faqs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FAQs'],
    }),

    // Delete FAQ (soft delete)
    deleteFAQ: builder.mutation<DeleteResponse, string>({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQs'],
    }),

    // Generate answer via AI
    generateFAQAnswer: builder.mutation<GenerateAnswerResponse, { question: string }>({
      query: (data) => ({
        url: '/faqs/generate-answer',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
})

// ==================== EXPORT HOOKS ====================
export const {
  useGetAllFAQsQuery,
  useLazyGetAllFAQsQuery,
  useGetFAQByIdQuery,
  useLazyGetFAQByIdQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useGenerateFAQAnswerMutation,
} = faqApi
