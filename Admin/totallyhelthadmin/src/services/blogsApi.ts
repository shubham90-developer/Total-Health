// services/blogApi.ts

import { baseApi } from '@/services/baseApi'

export interface Category {
  _id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  _id: string
  title: string
  date: number
  readTime: string
  hero: string
  tags: string[]
  category: Category | string
  content: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface GetBlogsResponse {
  success: boolean
  statusCode: number
  message: string
  data: BlogPost[]
}

export interface GetCategoriesResponse {
  success: boolean
  statusCode: number
  message: string
  data: Category[]
}

export interface BlogResponse {
  success: boolean
  statusCode: number
  message: string
  data: BlogPost
}

export interface CategoryResponse {
  success: boolean
  statusCode: number
  message: string
  data: Category
}

export interface CreateCategoryInput {
  name: string
  slug: string
}

export interface UpdateCategoryInput {
  name?: string
  slug?: string
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ==================== BLOG ENDPOINTS ====================

    // Get all blogs
    getAllBlogs: build.query<BlogPost[], void>({
      query: () => ({
        url: '/blogs',
        method: 'GET',
      }),
      transformResponse: (res: GetBlogsResponse) => res?.data,
      providesTags: (result) =>
        result ? [...result.map(({ _id }) => ({ type: 'Blog' as const, id: _id })), { type: 'Blog', id: 'LIST' }] : [{ type: 'Blog', id: 'LIST' }],
    }),

    // Create blog
    createBlog: build.mutation<BlogPost, FormData>({
      query: (data) => ({
        url: '/blogs',
        method: 'POST',
        body: data,
      }),
      transformResponse: (res: BlogResponse) => res?.data,
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),

    // Update blog
    updateBlog: build.mutation<BlogPost, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (res: BlogResponse) => res?.data,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
      ],
    }),

    // Delete blog
    deleteBlog: build.mutation<void, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
      ],
    }),

    // ==================== CATEGORY ENDPOINTS ====================

    // Get all categories
    getAllCategories: build.query<Category[], void>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      transformResponse: (res: GetCategoriesResponse) => res?.data,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Category' as const, id: _id })), { type: 'Category', id: 'LIST' }]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    // Create category
    createCategory: build.mutation<Category, CreateCategoryInput>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      transformResponse: (res: CategoryResponse) => res?.data,
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    // Update category
    updateCategory: build.mutation<Category, { id: string; data: UpdateCategoryInput }>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (res: CategoryResponse) => res?.data,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
        { type: 'Blog', id: 'LIST' }, // Also invalidate blogs as they contain category info
      ],
    }),

    // Delete category
    deleteCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
        { type: 'Blog', id: 'LIST' }, // Also invalidate blogs as associated blogs are deleted
      ],
    }),
  }),
  overrideExisting: true,
})

export const {
  // Blog hooks
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,

  // Category hooks
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = blogApi
