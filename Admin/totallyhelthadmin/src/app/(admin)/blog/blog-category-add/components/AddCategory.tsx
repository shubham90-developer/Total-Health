'use client'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useCreateCategoryMutation } from '@/services/blogsApi'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type controlType = {
  control: any
}

const GeneralInformationCard = ({ control }: controlType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Add category</CardTitle>
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

const AddCategory = () => {
  const router = useRouter()
  const [createCategory, { isLoading }] = useCreateCategoryMutation()

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

  // Auto-generate slug from name
  const categoryName = watch('name')
  React.useEffect(() => {
    if (categoryName) {
      const generatedSlug = categoryName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setValue('slug', generatedSlug)
    }
  }, [categoryName, setValue])

  const onSubmit = async (data: { name: string; slug: string }) => {
    try {
      await createCategory(data).unwrap()
      toast.success('Category created successfully')
      reset()
      router.push('/blog/blog-category')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create category')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GeneralInformationCard control={control} />
      <div className="p-3 bg-light mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Button variant="outline-secondary" type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Creating...
                </>
              ) : (
                'Create Category'
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

export default AddCategory
