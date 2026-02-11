import { baseApi } from '@/services/baseApi'

export type ServiceItem = {
  _id?: string
  title: string
  description: string
  image: string
  createdAt?: string
  updatedAt?: string
}

export type ServicesResponse = {
  success: boolean
  statusCode: number
  message: string
  data: ServiceItem[]
}

export type ServiceItemResponse = {
  success: boolean
  statusCode: number
  message: string
  data: ServiceItem
}

export type DeleteServiceResponse = {
  success: boolean
  statusCode: number
  message: string
  data: null
}

export type CreateServiceRequest = FormData
export type UpdateServiceRequest = FormData

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== GET ALL SERVICES ====================
    getAllServices: builder.query<ServicesResponse, void>({
      query: () => ({
        url: '/services',
        method: 'GET',
      }),
      transformResponse: (response: ServicesResponse) => response,
    }),

    // ==================== GET SERVICE BY ID ====================
    getServiceById: builder.query<ServiceItemResponse, string>({
      query: (serviceId) => ({
        url: `/services/${serviceId}`,
        method: 'GET',
      }),
      transformResponse: (response: ServiceItemResponse) => response,
    }),

    // ==================== CREATE SERVICE ====================
    createService: builder.mutation<ServiceItemResponse, CreateServiceRequest>({
      query: (formData) => ({
        url: '/services',
        method: 'POST',
        body: formData,
      }),
      transformResponse: (response: ServiceItemResponse) => response,
    }),

    // ==================== UPDATE SERVICE ====================
    updateService: builder.mutation<ServiceItemResponse, { serviceId: string; formData: UpdateServiceRequest }>({
      query: ({ serviceId, formData }) => ({
        url: `/services/${serviceId}`,
        method: 'PUT',
        body: formData,
      }),
      transformResponse: (response: ServiceItemResponse) => response,
    }),

    // ==================== DELETE SERVICE ====================
    deleteService: builder.mutation<DeleteServiceResponse, string>({
      query: (serviceId) => ({
        url: `/services/${serviceId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: DeleteServiceResponse) => response,
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetAllServicesQuery,
  useLazyGetAllServicesQuery,
  useGetServiceByIdQuery,
  useLazyGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi
