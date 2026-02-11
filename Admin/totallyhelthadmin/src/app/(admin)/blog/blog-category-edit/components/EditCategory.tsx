'use client'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Spinner, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useGetAllCategoriesQuery, useUpdateCategoryMutation } from '@/services/blogsApi'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
type controlType = {
  control: any
}

const GeneralInformationCard = ({ control }: controlType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Edit category</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} name="name" label="Category Name" placeholder="Enter category name" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} name="slug" label="Category Slug" placeholder="Enter category slug (e.g., travel-tips)" />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const EditCategory = () => {
  const router = useRouter()
  const params = useParams()
  const categoryId = params?.id as string

  const { data: categories = [], isLoading: isFetching } = useGetAllCategoriesQuery()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()

  const messageSchema = yup.object({
    name: yup.string().required('Please enter category name'),
    slug: yup
      .string()
      .required('Please enter category slug')
      .matches(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  })

  const { reset, handleSubmit, control, setValue, watch } = useForm({
    resolver: yupResolver(messageSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  })

  // Find current category and populate form
  useEffect(() => {
    const category = categories.find((cat: any) => cat._id === categoryId)
    if (category) {
      reset({
        name: category.name,
        slug: category.slug,
      })
    }
  }, [categories, categoryId, reset])

  const onSubmit = async (data: { name: string; slug: string }) => {
    try {
      await updateCategory({ id: categoryId, data }).unwrap()
      toast.success('Category updated successfully')
      router.push('/blog/blog-category')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update category')
    }
  }

  if (isFetching) {
    return (
      <Card>
        <div className="p-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Card>
    )
  }

  const category = categories.find((cat: any) => cat._id === categoryId)
  if (!category) {
    return (
      <Card>
        <CardBody>
          <Alert variant="danger">Category not found</Alert>
          <Link href="/blog/blog-category" className="btn btn-primary">
            Back to Categories
          </Link>
        </CardBody>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GeneralInformationCard control={control} />
      <div className="p-3 bg-light mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Button variant="outline-secondary" type="submit" className="w-100" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </Col>
          <Col lg={2}>
            <Link href="/blog/blog-category" className="btn btn-primary w-100">
              Cancel
            </Link>
          </Col>
        </Row>
      </div>
    </form>
  )
}

export default EditCategory
