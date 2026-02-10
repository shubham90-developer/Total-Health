'use client'
import ChoicesFormInput from '@/components/form/ChoicesFormInput'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { Control, FieldPath, FieldValues, useForm } from 'react-hook-form'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { FormInputProps } from '@/types/component-props'
import Link from 'next/link'
import { useGetAboutUsQuery, useUpdateAboutUsMutation } from '@/services/about-usApi'
import { toast } from 'react-hot-toast' // or your toast library

type controlType = {
  control: Control<any>
  aboutUsData?: any
}

const GeneralInformationCard = ({ control, aboutUsData }: controlType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h4'}>About Us</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} name="title" label="Title" placeholder="Enter Title" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="subtitle" label="Subtitle" placeholder="Enter Subtitle" />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-3">
              <TextFormInput control={control} type="file" name="banner" label="Banner" placeholder="" />
              {aboutUsData?.banner && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.banner}
                    alt="Current banner"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.banner.split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="infoTitle1" label="Info Title 1" placeholder="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="infoSubtitle1" label="Info Sub-title 1" placeholder="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="infoTitle2" label="Info Title 2" placeholder="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="infoSubtitle2" label="Info Sub-title 2" placeholder="" />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-0">
              <TextAreaFormInput rows={4} control={control} type="text" name="aboutDescription" label="Description" placeholder="Type description" />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const InfoCard1 = ({ control, aboutUsData }: controlType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Founder Information</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="founderTitle" label="Title" placeholder="Enter Title" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="file" name="founderImage" label="Founder Image" placeholder="" />
              {aboutUsData?.founderImage && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.founderImage}
                    alt="Current founder image"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.founderImage.split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="founderName" label="Founder Name" placeholder="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="founderDesignation" label="Founder Designation" placeholder="" />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-0">
              <TextAreaFormInput
                rows={4}
                control={control}
                type="text"
                name="founderDescription"
                label="Description"
                placeholder="Type description"
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const InfoCard2 = ({ control, aboutUsData }: controlType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h4'}>About Information</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="aboutInfoTitle" label="Title" placeholder="Enter Title" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="aboutInfoSubtitle" label="Sub Title" placeholder="" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="file" name="isoCertificate" label="ISO Certificate" placeholder="" />
              {aboutUsData?.isoCertificate && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.isoCertificate}
                    alt="Current ISO certificate"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.isoCertificate.split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="file" name="infoBanner1" label="Banner 1" placeholder="" />
              {aboutUsData?.infoBanner1 && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.infoBanner1}
                    alt="Current banner 1"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.infoBanner1.split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="file" name="infoBanner2" label="Banner 2" placeholder="" />
              {aboutUsData?.infoBanner2 && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.infoBanner2}
                    alt="Current banner 2"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.infoBanner2.split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="file" name="infoBanner3" label="Banner 3" placeholder="" />
              {aboutUsData?.infoBanner3 && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.infoBanner3}
                    alt="Current banner 3"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.infoBanner3.split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-0">
              <TextAreaFormInput
                rows={4}
                control={control}
                type="text"
                name="aboutInfoDescription"
                label="Description"
                placeholder="Type description"
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const AdditionalInfoCard = ({ control, aboutUsData }: controlType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Additional Information</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="additionalInfoTitle" label="Title" placeholder="Enter Title" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="additionalInfoSubtitle" label="Subtitle" placeholder="Enter Subtitle" />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-3">
              <TextAreaFormInput
                rows={4}
                control={control}
                type="text"
                name="additionalInfoDescription"
                label="Description"
                placeholder="Type description"
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <TextFormInput control={control} type="file" name="additionalImage1" label="Image 1" placeholder="" />
              {aboutUsData?.additionalInfo?.images?.[0] && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.additionalInfo.images[0]}
                    alt="Current additional image 1"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.additionalInfo.images[0].split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <TextFormInput control={control} type="file" name="additionalImage2" label="Image 2" placeholder="" />
              {aboutUsData?.additionalInfo?.images?.[1] && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.additionalInfo.images[1]}
                    alt="Current additional image 2"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.additionalInfo.images[1].split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-0">
              <TextFormInput control={control} type="file" name="additionalImage3" label="Image 3" placeholder="" />
              {aboutUsData?.additionalInfo?.images?.[2] && (
                <div className="mt-2">
                  <img
                    src={aboutUsData.additionalInfo.images[2]}
                    alt="Current additional image 3"
                    style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <small className="d-block text-muted mt-1">Current: {aboutUsData.additionalInfo.images[2].split('/').pop()}</small>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const MetaOptionsCard = ({ control }: controlType) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Meta Options</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="metaTitle" label="Meta Title" placeholder="Enter Title" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <TextFormInput control={control} type="text" name="metaKeyword" label="Meta Tag Keyword" placeholder="Enter word" />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-0">
              <TextAreaFormInput rows={4} control={control} type="text" name="metaDescription" label="Description" placeholder="Type description" />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const AboutUS = () => {
  // RTK Query hooks
  const { data: aboutUsData, isLoading, isError } = useGetAboutUsQuery()
  const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation()

  const messageSchema = yup.object({
    // Required fields
    title: yup.string().required('Please enter title'),
    subtitle: yup.string().required('Please enter subtitle'),
    aboutDescription: yup.string().required('Please enter description'),
    metaTitle: yup.string().required('Please enter meta title'),
    metaKeyword: yup.string().required('Please enter meta keyword'),
    metaDescription: yup.string().required('Please enter meta description'),

    // Optional fields
    infoTitle1: yup.string(),
    infoSubtitle1: yup.string(),
    infoTitle2: yup.string(),
    infoSubtitle2: yup.string(),
    founderTitle: yup.string(),
    founderName: yup.string(),
    founderDesignation: yup.string(),
    founderDescription: yup.string(),
    aboutInfoTitle: yup.string(),
    aboutInfoSubtitle: yup.string(),
    aboutInfoDescription: yup.string(),
    additionalInfoTitle: yup.string(),
    additionalInfoSubtitle: yup.string(),
    additionalInfoDescription: yup.string(),
  })

  const { reset, handleSubmit, control, setValue, register } = useForm({
    resolver: yupResolver(messageSchema),
  })

  // Populate form with fetched data
  useEffect(() => {
    if (aboutUsData) {
      reset({
        title: aboutUsData.title || '',
        subtitle: aboutUsData.subtitle || '',
        infoTitle1: aboutUsData.infoTitle1 || '',
        infoSubtitle1: aboutUsData.infoSubtitle1 || '',
        infoTitle2: aboutUsData.infoTitle2 || '',
        infoSubtitle2: aboutUsData.infoSubtitle2 || '',
        aboutDescription: aboutUsData.aboutDescription || '',
        founderTitle: aboutUsData.founderTitle || '',
        founderName: aboutUsData.founderName || '',
        founderDesignation: aboutUsData.founderDesignation || '',
        founderDescription: aboutUsData.founderDescription || '',
        aboutInfoTitle: aboutUsData.aboutInfoTitle || '',
        aboutInfoSubtitle: aboutUsData.aboutInfoSubtitle || '',
        aboutInfoDescription: aboutUsData.aboutInfoDescription || '',
        metaTitle: aboutUsData.metaTitle || '',
        metaKeyword: aboutUsData.metaKeyword || '',
        metaDescription: aboutUsData.metaDescription || '',
        additionalInfoTitle: aboutUsData.additionalInfo?.title || '',
        additionalInfoSubtitle: aboutUsData.additionalInfo?.subtitle || '',
        additionalInfoDescription: aboutUsData.additionalInfo?.description || '',
      })
    }
  }, [aboutUsData, reset])

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData()

      // Append text fields
      const textFields = [
        'title',
        'subtitle',
        'aboutDescription',
        'infoTitle1',
        'infoSubtitle1',
        'infoTitle2',
        'infoSubtitle2',
        'founderTitle',
        'founderName',
        'founderDesignation',
        'founderDescription',
        'aboutInfoTitle',
        'aboutInfoSubtitle',
        'aboutInfoDescription',
        'metaTitle',
        'metaKeyword',
        'metaDescription',
        'additionalInfoTitle',
        'additionalInfoSubtitle',
        'additionalInfoDescription',
      ]

      textFields.forEach((field) => {
        if (data[field]) {
          formData.append(field, data[field])
        }
      })

      // Handle file uploads properly
      const fileFields = [
        'banner',
        'founderImage',
        'isoCertificate',
        'infoBanner1',
        'infoBanner2',
        'infoBanner3',
        'additionalImage1',
        'additionalImage2',
        'additionalImage3',
      ]

      fileFields.forEach((field) => {
        const fileData = data[field]

        if (fileData) {
          if (fileData instanceof FileList && fileData.length > 0) {
            formData.append(field, fileData[0])
          } else if (fileData instanceof File) {
            formData.append(field, fileData)
          } else if (Array.isArray(fileData) && fileData.length > 0 && fileData[0] instanceof File) {
            formData.append(field, fileData[0])
          }
        }
      })

      // Debug log
      console.log('FormData contents:')
      for (let pair of formData.entries()) {
        console.log(pair[0], ':', pair[1])
      }

      await updateAboutUs(formData).unwrap()
      toast.success('About Us updated successfully!')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update About Us')
      console.error('Update error:', error)
    }
  }

  if (isLoading) {
    return <div className="text-center p-5">Loading...</div>
  }

  if (isError) {
    return <div className="text-center p-5 text-danger">Error loading data</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GeneralInformationCard control={control} aboutUsData={aboutUsData} />
      <InfoCard1 control={control} aboutUsData={aboutUsData} />
      <InfoCard2 control={control} aboutUsData={aboutUsData} />
      <AdditionalInfoCard control={control} aboutUsData={aboutUsData} />
      <MetaOptionsCard control={control} />
      <div className="p-3 bg-light mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Button variant="outline-secondary" type="submit" className="w-100" disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Change'}
            </Button>
          </Col>
          <Col lg={2}>
            <Link href="" className="btn btn-primary w-100">
              Cancel
            </Link>
          </Col>
        </Row>
      </div>
    </form>
  )
}

export default AboutUS
