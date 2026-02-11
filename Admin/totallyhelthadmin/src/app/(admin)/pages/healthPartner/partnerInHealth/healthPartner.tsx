'use client'

import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Card, CardBody, CardHeader, CardTitle, Col, Container, Row, Button, Spinner } from 'react-bootstrap'
import Link from 'next/link'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useGetHealthQuery, useUpdatePartnerBenefitsMutation, useUpdateWhyPartnerMutation } from '@/services/healthPartnerApi'

import { toast } from 'react-toastify'
import Image from 'next/image'

type PartnerInHealthFormData = {
  partnerTitle: string
  partnerSubTitle: string
  partnerImage: FileList | null
  partnerImageUrl?: string
  whyPartnerTitle: string
  whyPartnerDescription: string
  whyPartnerVideo: string
}

const partnerInHealthSchema = yup.object({
  partnerTitle: yup.string().required('Please enter title'),
  partnerSubTitle: yup.string().required('Please enter sub title'),
  partnerImage: yup
    .mixed()
    .nullable()
    .test('partnerImage-required', 'Please upload an image', function (value) {
      const parent = this.parent as PartnerInHealthFormData
      return (value && value instanceof FileList && value.length > 0) || !!parent.partnerImageUrl
    }),
  partnerImageUrl: yup.string().optional(),
  whyPartnerTitle: yup.string().required('Please enter why partner title'),
  whyPartnerDescription: yup.string().required('Please enter description'),
  whyPartnerVideo: yup.string().required('Please enter video URL'),
})

const PartnerInHealth = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<PartnerInHealthFormData>({
    resolver: yupResolver(partnerInHealthSchema) as any,
    defaultValues: {
      partnerTitle: '',
      partnerSubTitle: '',
      partnerImage: null,
      partnerImageUrl: '',
      whyPartnerTitle: '',
      whyPartnerDescription: '',
      whyPartnerVideo: '',
    },
  })

  const {
    data: healthData,
    isLoading,
    refetch,
  } = useGetHealthQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const [updatePartnerBenefits] = useUpdatePartnerBenefitsMutation()
  const [updateWhyPartner] = useUpdateWhyPartnerMutation()

  useEffect(() => {
    if (healthData?.data) {
      const data = healthData.data
      reset({
        partnerTitle: data.PartnerinHealthBenefits?.title || '',
        partnerSubTitle: data.PartnerinHealthBenefits?.subTitle || '',
        partnerImage: null,
        partnerImageUrl: data.PartnerinHealthBenefits?.image || '',
        whyPartnerTitle: data.whyPartner?.title || '',
        whyPartnerDescription: data.whyPartner?.description || '',
        whyPartnerVideo: data.whyPartner?.video || '',
      })
    }
  }, [healthData, reset])

  const onSubmit = async (data: PartnerInHealthFormData) => {
    try {
      const partnerFormData = new FormData()
      partnerFormData.append('title', data.partnerTitle.trim())
      partnerFormData.append('subTitle', data.partnerSubTitle.trim())

      if (data.partnerImage && data.partnerImage.length > 0) {
        partnerFormData.append('image', data.partnerImage[0])
      }

      const whyPartnerPayload = {
        title: data.whyPartnerTitle.trim(),
        description: data.whyPartnerDescription.trim(),
        video: data.whyPartnerVideo.trim(),
      }

      await Promise.all([updatePartnerBenefits(partnerFormData).unwrap(), updateWhyPartner(whyPartnerPayload).unwrap()])

      toast.success('Partner in Health data saved successfully')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Failed to save Partner in Health data')
    }
  }

  if (isLoading) {
    return (
      <Container>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </Container>
    )
  }

  const currentImageUrl = healthData?.data?.PartnerinHealthBenefits?.image
  const watchedImage = watch('partnerImage')

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ==================== Partner in Health Benefits Section ==================== */}
        <Card>
          <CardHeader>
            <CardTitle as="h4">Partner in Health Benefits</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg={6}>
                <TextFormInput control={control} name="partnerTitle" label="Title" placeholder="Enter Title" />
              </Col>
              <Col lg={6}>
                <TextFormInput control={control} name="partnerSubTitle" label="Sub Title" placeholder="Enter Sub Title" />
              </Col>
              <Col lg={12}>
                <Controller
                  control={control}
                  name="partnerImage"
                  render={({ field: { onChange, value, ...field }, fieldState }) => (
                    <div className="mt-3">
                      <label className="form-label">Image</label>
                      <input
                        {...field}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files
                          onChange(files)
                        }}
                        className={`form-control ${fieldState.error ? 'is-invalid' : ''}`}
                      />
                      {currentImageUrl && !watchedImage && (
                        <div className="mt-2">
                          <small className="text-muted d-block mb-1">Current image:</small>
                          <Image
                            src={currentImageUrl}
                            alt="Partner in Health Image"
                            width={160}
                            height={100}
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                          />
                        </div>
                      )}
                      {fieldState.error && <div className="invalid-feedback">{fieldState.error.message}</div>}
                    </div>
                  )}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* ==================== Why Partner Section ==================== */}
        <Card>
          <CardHeader>
            <CardTitle as="h4">Why Partner</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg={6}>
                <TextFormInput control={control} name="whyPartnerTitle" label="Title" placeholder="Enter Title" />
              </Col>
              <Col lg={6}>
                <TextFormInput control={control} name="whyPartnerVideo" label="Video URL" placeholder="Enter Video URL" />
              </Col>
              <Col lg={12}>
                <div className="mt-3">
                  <label className="form-label">Description</label>
                  <Controller
                    control={control}
                    name="whyPartnerDescription"
                    render={({ field, fieldState }) => (
                      <>
                        <textarea
                          {...field}
                          rows={4}
                          placeholder="Enter Description"
                          className={`form-control ${fieldState.error ? 'is-invalid' : ''}`}
                        />
                        {fieldState.error && <div className="invalid-feedback">{fieldState.error.message}</div>}
                      </>
                    )}
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* ==================== Action Buttons ==================== */}
        <div className="p-3 bg-light mb-3 rounded">
          <Row className="justify-content-end g-2">
            <Col lg={2}>
              <Button variant="outline-secondary" type="submit" className="w-100" disabled={isSubmitting}>
                {isSubmitting ? <Spinner size="sm" /> : 'Save'}
              </Button>
            </Col>
            <Col lg={2}>
              <Link href="/pages/partner-in-health" className="btn btn-primary w-100">
                Cancel
              </Link>
            </Col>
          </Row>
        </div>
      </form>
    </Container>
  )
}

export default PartnerInHealth
