// services/contractApi.ts

import { baseApi } from '@/services/baseApi'

export interface Contract {
  _id: string
  name: string
  subject: string
  emailAddress: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateContractRequest {
  name: string
  subject: string
  emailAddress: string
  message: string
}

export interface GetContractsParams {
  status?: 'pending' | 'approved' | 'rejected'
}

export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}

export const contractApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Contract
    createContract: build.mutation<Contract, CreateContractRequest>({
      query: (data) => ({
        url: '/contracts',
        method: 'POST',
        body: data,
      }),
      transformResponse: (res: ApiResponse<Contract>) => res?.data,
      invalidatesTags: [{ type: 'Contract', id: 'LIST' }],
    }),

    // Get All Contracts
    getAllContracts: build.query<Contract[], GetContractsParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params && params.status) {
          queryParams.append('status', params.status)
        }
        return {
          url: `/contracts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
          method: 'GET',
        }
      },
      transformResponse: (res: ApiResponse<Contract[]>) => res?.data,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Contract' as const, id: _id })), { type: 'Contract', id: 'LIST' }]
          : [{ type: 'Contract', id: 'LIST' }],
    }),

    // Delete Contract
    deleteContract: build.mutation<Contract, string>({
      query: (id) => ({
        url: `/contracts/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (res: ApiResponse<Contract>) => res?.data,
      invalidatesTags: (result, error, id) => [
        { type: 'Contract', id },
        { type: 'Contract', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: true,
})

export const { useCreateContractMutation, useGetAllContractsQuery, useDeleteContractMutation } = contractApi
