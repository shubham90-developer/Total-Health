'use client'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Button, Spinner, Form } from 'react-bootstrap'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useGetAllCategoriesQuery, useCreateBlogMutation } from '@/services/blogsApi'

import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface BlogFormData {
  title: string
  category: string
  readTime: string
  tags: string
  content: string
  status: 'draft' | 'published' | 'archived'
  hero: FileList | null
}

const CreateBlog = () => {
  const router = useRouter()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { data: categories = [], isLoading: isCategoriesLoading } = useGetAllCategoriesQuery()
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation()

  const blogSchema = yup.object({
    title: yup.string().required('Title is required'),
    category: yup.string().required('Category is required'),
    readTime: yup.string().required('Read time is required'),
    tags: yup.string().required('Tags are required (comma separated)'),
    content: yup.string().required('Content is required'),
    status: yup.string().oneOf(['draft', 'published', 'archived']).required('Status is required'),
    hero: yup
      .mixed()
      .test('required', 'Banner image is required', (value: any) => {
        return value && value.length > 0
      })
      .test('fileSize', 'File size must be less than 5MB', (value: any) => {
        if (!value || value.length === 0) return true
        return value[0].size <= 5242880 // 5MB
      })
      .test('fileType', 'Only image files are allowed', (value: any) => {
        if (!value || value.length === 0) return true
        return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value[0].type)
      }),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<BlogFormData>({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: '',
      category: '',
      readTime: '',
      tags: '',
      content: '',
      status: 'draft',
    },
  })

  // Watch hero file input for preview
  const heroFile = watch('hero')
  React.useEffect(() => {
    if (heroFile && heroFile.length > 0) {
      const file = heroFile[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [heroFile])

  const onSubmit = async (data: BlogFormData) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('category', data.category)
      formData.append('readTime', data.readTime)
      formData.append('date', Date.now().toString())
      formData.append('tags', JSON.stringify(data.tags.split(',').map((tag) => tag.trim())))
      formData.append('content', data.content)
      formData.append('status', data.status)
      if (data.hero && data.hero.length > 0) {
        formData.append('hero', data.hero[0])
      }

      await createBlog(formData).unwrap()
      toast.success('Blog created successfully')
      router.push('/blog/blog-list')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create blog')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Create Blog</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <label htmlFor="hero" className="form-label">
                  Upload Banner <span className="text-danger">*</span>
                </label>
                <input type="file" id="hero" className={`form-control ${errors.hero ? 'is-invalid' : ''}`} accept="image/*" {...register('hero')} />
                {errors.hero && <div className="invalid-feedback">{errors.hero.message}</div>}
                {previewImage && (
                  <div className="mt-2">
                    <Image src={previewImage} alt="Preview" width={200} height={120} className="rounded" style={{ objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="Enter blog title"
                  {...register('title')}
                />
                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                  id="category"
                  {...register('category')}
                  disabled={isCategoriesLoading}>
                  <option value="">Select Category</option>
                  {categories.map((cat: any) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-3">
                <label htmlFor="readTime" className="form-label">
                  Read Time <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="readTime"
                  className={`form-control ${errors.readTime ? 'is-invalid' : ''}`}
                  placeholder="e.g., 5 min"
                  {...register('readTime')}
                />
                {errors.readTime && <div className="invalid-feedback">{errors.readTime.message}</div>}
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status <span className="text-danger">*</span>
                </label>
                <select className={`form-control ${errors.status ? 'is-invalid' : ''}`} id="status" {...register('status')}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
              </div>
            </Col>

            <Col lg={12}>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Tags <span className="text-danger">*</span>
                  <small className="text-muted ms-2">(comma separated)</small>
                </label>
                <input
                  type="text"
                  id="tags"
                  className={`form-control ${errors.tags ? 'is-invalid' : ''}`}
                  placeholder="e.g., travel, food, culture"
                  {...register('tags')}
                />
                {errors.tags && <div className="invalid-feedback">{errors.tags.message}</div>}
              </div>
            </Col>

            <Col lg={12}>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control bg-light-subtle ${errors.content ? 'is-invalid' : ''}`}
                  id="content"
                  rows={10}
                  placeholder="Write your blog content here..."
                  {...register('content')}
                />
                {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <div className="p-3 bg-light mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Button variant="outline-secondary" type="submit" className="w-100" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Creating...
                </>
              ) : (
                'Create Blog'
              )}
            </Button>
          </Col>
          <Col lg={2}>
            <Link href="/blog/blog-list" className="btn btn-primary w-100">
              Cancel
            </Link>
          </Col>
        </Row>
      </div>
    </form>
  )
}

export default CreateBlog
