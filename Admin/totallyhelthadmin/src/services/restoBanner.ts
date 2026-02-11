import { baseApi } from '@/services/baseApi'

// ─── Types ────────────────────────────────────────────────────────────────────

export type RestoBanner = {
  _id: string
  image: string
  status: 'active' | 'inactive'
}

export interface GetRestoBannersResponse {
  success: boolean
  statusCode: number
  message: string
  data: RestoBanner[]
}

export interface GetRestoBannerResponse {
  success: boolean
  statusCode: number
  message: string
  data: RestoBanner
}

export interface CreateRestoBannerResponse {
  success: boolean
  statusCode: number
  message: string
  data: RestoBanner
}

export interface UpdateRestoBannerResponse {
  success: boolean
  statusCode: number
  message: string
  data: RestoBanner
}

export interface DeleteRestoBannerResponse {
  success: boolean
  statusCode: number
  message: string
  data: RestoBanner
}

// ─── API Slice ────────────────────────────────────────────────────────────────

export const restoBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET /resto-banners?status=active|inactive
    getRestoBanners: build.query<GetRestoBannersResponse, { status?: 'active' | 'inactive' } | void>({
      query: (params) => ({
        url: '/resto-banner',
        method: 'GET',
        params: params ?? {},
      }),
      providesTags: [{ type: 'RestoBanner', id: 'LIST' }],
    }),

    // GET /resto-banners/:id
    getRestoBannerById: build.query<RestoBanner, string>({
      query: (id) => ({ url: `/resto-banner/${id}`, method: 'GET' }),
      transformResponse: (res: GetRestoBannerResponse) => res?.data,
      providesTags: (_r, _e, id) => [{ type: 'RestoBanner' as const, id }],
    }),

    // POST /resto-banners  — body: FormData with field "file"
    createRestoBanner: build.mutation<RestoBanner, FormData>({
      query: (body) => ({
        url: '/resto-banner',
        method: 'POST',
        body,
      }),
      transformResponse: (res: CreateRestoBannerResponse) => res?.data,
      invalidatesTags: [{ type: 'RestoBanner', id: 'LIST' }],
    }),

    // PATCH /resto-banners/:id  — body: FormData with optional "file" / "status"
    updateRestoBanner: build.mutation<RestoBanner, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/resto-banner/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (res: UpdateRestoBannerResponse) => res?.data,
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'RestoBanner', id },
        { type: 'RestoBanner', id: 'LIST' },
      ],
    }),

    // DELETE /resto-banners/:id
    deleteRestoBanner: build.mutation<RestoBanner, string>({
      query: (id) => ({ url: `/resto-banner/${id}`, method: 'DELETE' }),
      transformResponse: (res: DeleteRestoBannerResponse) => res?.data,
      invalidatesTags: (_r, _e, id) => [
        { type: 'RestoBanner', id },
        { type: 'RestoBanner', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetRestoBannersQuery,
  useLazyGetRestoBannersQuery,
  useGetRestoBannerByIdQuery,
  useCreateRestoBannerMutation,
  useUpdateRestoBannerMutation,
  useDeleteRestoBannerMutation,
} = restoBannerApi
