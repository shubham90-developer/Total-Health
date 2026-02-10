'use client'

import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Spinner, Button } from 'react-bootstrap'
import Image from 'next/image'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import {
  useCreateCompanyBenefitMutation,
  useUpdateCompanyBenefitMutation,
  useCreateEmployeeBenefitMutation,
  useUpdateEmployeeBenefitMutation,
  BenefitItem,
} from '@/services/healthPartnerApi'

import { toast } from 'react-toastify'

interface AddEditBenefitModalProps {
  show: boolean
  onHide: () => void
  mode: 'add' | 'edit'
  benefitId: string | null
  benefitType: 'company' | 'employee'
  benefits: BenefitItem[]
  onSuccess: () => void
}

type FormData = {
  icon?: FileList
  text: string
  status: string
}

const benefitSchema: yup.ObjectSchema<FormData> = yup.object({
  icon: yup.mixed<FileList>().when('$mode', {
    is: 'add',
    then: (schema) => schema.test('required', 'Please upload an icon', (value) => value && value.length > 0).required(),
    otherwise: (schema) => schema.optional(),
  }),
  text: yup.string().required('Please enter benefit text'),
  status: yup.string().required('Please select a status'),
})

const AddEditBenefitModal: React.FC<AddEditBenefitModalProps> = ({ show, onHide, mode, benefitId, benefitType, benefits, onSuccess }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Mutations
  const [createCompanyBenefit, { isLoading: isCreatingCompany }] = useCreateCompanyBenefitMutation()
  const [updateCompanyBenefit, { isLoading: isUpdatingCompany }] = useUpdateCompanyBenefitMutation()
  const [createEmployeeBenefit, { isLoading: isCreatingEmployee }] = useCreateEmployeeBenefitMutation()
  const [updateEmployeeBenefit, { isLoading: isUpdatingEmployee }] = useUpdateEmployeeBenefitMutation()

  const isSubmitting = isCreatingCompany || isUpdatingCompany || isCreatingEmployee || isUpdatingEmployee

  // Find the benefit being edited
  const benefit = mode === 'edit' ? benefits.find((b) => b._id === benefitId) : null

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(benefitSchema),
    context: { mode },
    defaultValues: {
      status: 'active',
      text: '',
    },
  })

  // Watch icon field for preview
  const iconField = watch('icon')

  useEffect(() => {
    if (iconField && iconField.length > 0) {
      const file = iconField[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [iconField])

  // Load benefit data when editing
  useEffect(() => {
    if (show && mode === 'edit' && benefit) {
      setValue('text', benefit.text)
      setValue('status', benefit.status)
      setPreviewImage(benefit.icon)
    } else if (show && mode === 'add') {
      reset({ status: 'active', text: '' })
      setPreviewImage(null)
    }
  }, [show, mode, benefit, setValue, reset])

  const onSubmit = async (data: FormData) => {
    try {
      const formDataObj = new FormData()

      formDataObj.append('text', String(data.text || '').trim())
      formDataObj.append('status', String(data.status || 'active').trim())

      // Add icon if provided
      if (data.icon && data.icon.length > 0 && data.icon[0] instanceof File) {
        formDataObj.append('icon', data.icon[0], data.icon[0].name)
      } else if (mode === 'add') {
        toast.error('Please upload an icon')
        return
      }

      if (mode === 'add') {
        // Create new benefit
        if (benefitType === 'company') {
          await createCompanyBenefit(formDataObj).unwrap()
          toast.success('Company benefit created successfully')
        } else {
          await createEmployeeBenefit(formDataObj).unwrap()
          toast.success('Employee benefit created successfully')
        }
      } else {
        // Update existing benefit
        if (!benefitId) {
          toast.error('Benefit ID not found')
          return
        }

        if (benefitType === 'company') {
          await updateCompanyBenefit({ benefitId, formData: formDataObj }).unwrap()
          toast.success('Company benefit updated successfully')
        } else {
          await updateEmployeeBenefit({ benefitId, formData: formDataObj }).unwrap()
          toast.success('Employee benefit updated successfully')
        }
      }

      onSuccess()
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || `Failed to ${mode} benefit`
      toast.error(errorMessage)
    }
  }

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.png'
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    if (imagePath.startsWith('data:')) {
      return imagePath
    }
    return imagePath
  }

  const handleClose = () => {
    reset()
    setPreviewImage(null)
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <IconifyIcon icon={mode === 'add' ? 'solar:add-circle-bold' : 'solar:pen-2-broken'} className="me-2" />
          {mode === 'add' ? 'Add' : 'Edit'} {benefitType === 'company' ? 'Company' : 'Employee'} Benefit
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <div className="mb-3">
                <Controller
                  control={control}
                  name="icon"
                  render={({ field: { onChange, value, ...field }, fieldState }) => (
                    <div>
                      <label className="form-label">Benefit Icon {mode === 'add' && <span className="text-danger">*</span>}</label>
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
                      {fieldState.error && <div className="invalid-feedback">{fieldState.error.message}</div>}
                      {previewImage && (
                        <div className="mt-2">
                          <small className="text-muted">{mode === 'edit' ? 'Current' : 'Preview'} icon:</small>
                          <div className="mt-1">
                            <Image
                              src={getImageUrl(previewImage)}
                              alt="Icon preview"
                              width={100}
                              height={100}
                              style={{ objectFit: 'cover', borderRadius: '4px' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </Col>

            <Col md={12}>
              <div className="mb-3">
                <TextAreaFormInput control={control} name="text" label="Benefit Text" placeholder="Enter benefit description" rows={4} />
              </div>
            </Col>

            <Col md={12}>
              <label className="form-label">
                Status <span className="text-danger">*</span>
              </label>
              <Controller
                control={control}
                name="status"
                rules={{ required: 'Please select a status' }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="active"
                          id="statusActive"
                          checked={field.value === 'active'}
                          onChange={field.onChange}
                        />
                        <label className="form-check-label" htmlFor="statusActive">
                          Active
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="inactive"
                          id="statusInactive"
                          checked={field.value === 'inactive'}
                          onChange={field.onChange}
                        />
                        <label className="form-check-label" htmlFor="statusInactive">
                          Inactive
                        </label>
                      </div>
                    </div>
                    {fieldState.error && <small className="text-danger">{fieldState.error.message}</small>}
                  </>
                )}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                {mode === 'add' ? 'Creating...' : 'Updating...'}
              </>
            ) : (
              <>
                <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                {mode === 'add' ? 'Create Benefit' : 'Update Benefit'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddEditBenefitModal
