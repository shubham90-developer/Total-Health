import { baseApi } from '@/services/baseApi'

// ==================== TYPES ====================

export type ChoiceOption = {
  _id?: string
  name: string
  price: number
}

export type Choices = {
  choice1?: ChoiceOption[]
  choice2?: ChoiceOption[]
  choice3?: ChoiceOption[]
  choice4?: ChoiceOption[]
}

export type CategoryItem = {
  _id: string
  title: string
  description?: string
  image?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export type MenuItemType = {
  _id: string
  title: string
  description: string
  categoryId: CategoryItem | string
  choices?: Choices
  price: number
  quantity: number
  nutritionFacts?: {
    nutrition?: string
  }
  images?: string[]
  isAvailable: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Response types
export type CategoryResponse = {
  success: boolean
  statusCode: number
  message: string
  data: CategoryItem
}

export type CategoriesResponse = {
  success: boolean
  statusCode: number
  message: string
  data: CategoryItem[]
}

export type MenuItemResponse = {
  success: boolean
  statusCode: number
  message: string
  data: MenuItemType
}

export type MenuItemsResponse = {
  success: boolean
  statusCode: number
  message: string
  data: MenuItemType[]
}

export type DeleteResponse = {
  success: boolean
  statusCode: number
  message: string
  data: null
}

// ==================== API ENDPOINTS ====================
export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== CATEGORIES ====================
    getAllCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: '/menu-items/categories',
        method: 'GET',
      }),
      providesTags: ['MenuCategories'],
    }),

    createCategory: builder.mutation<CategoryResponse, FormData>({
      query: (formData) => ({
        url: '/menu-items/categories',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['MenuCategories'],
    }),

    updateCategory: builder.mutation<CategoryResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/menu-items/categories/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['MenuCategories'],
    }),

    deleteCategory: builder.mutation<DeleteResponse, string>({
      query: (id) => ({
        url: `/menu-items/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuCategories', 'MenuItems'],
    }),

    // ==================== MENU ITEMS ====================
    getAllMenuItems: builder.query<MenuItemsResponse, void>({
      query: () => ({
        url: '/menu-items/menu-items',
        method: 'GET',
      }),
      providesTags: ['MenuItems'],
    }),

    createMenuItem: builder.mutation<MenuItemResponse, FormData>({
      query: (formData) => ({
        url: '/menu-items/menu-items',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['MenuItems'],
    }),

    updateMenuItem: builder.mutation<MenuItemResponse, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/menu-items/menu-items/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['MenuItems'],
    }),

    deleteMenuItem: builder.mutation<DeleteResponse, string>({
      query: (id) => ({
        url: `/menu-items/menu-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuItems'],
    }),
  }),
  overrideExisting: true,
})

// ==================== EXPORT HOOKS ====================
export const {
  // Categories
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Menu Items
  useGetAllMenuItemsQuery,
  useLazyGetAllMenuItemsQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = menuApi
