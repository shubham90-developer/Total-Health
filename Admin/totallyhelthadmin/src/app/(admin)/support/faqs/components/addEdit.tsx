'use client'

import React, { useEffect } from 'react'
import { Modal, Row, Col, Spinner, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useForm } from 'react-hook-form'
import { useCreateFAQMutation, useUpdateFAQMutation, FAQItem } from '@/services/faqApi'
import { toast } from 'react-toastify'

interface AddEditFAQModalProps {
  show: boolean
  onHide: () => void
  mode: 'add' | 'edit'
  faqId: string | null
  faqs: FAQItem[]
  onSuccess: () => void
}

type FormData = {
  question: string
  answer: string
  isActive: string
}

const AddEditFAQModal: React.FC<AddEditFAQModalProps> = ({ show, onHide, mode, faqId, faqs, onSuccess }) => {
  const [createFAQ, { isLoading: isCreating }] = useCreateFAQMutation()
  const [updateFAQ, { isLoading: isUpdating }] = useUpdateFAQMutation()
  const isSubmitting = isCreating || isUpdating

  const faq = mode === 'edit' ? faqs.find((f) => f._id === faqId) : null

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: { isActive: 'active', question: '', answer: '' },
  })

  useEffect(() => {
    if (show && mode === 'edit' && faq) {
      setValue('question', faq.question)
      setValue('answer', faq.answer)
      setValue('isActive', faq.isActive ? 'active' : 'inactive')
    } else if (show && mode === 'add') {
      reset({ isActive: 'active', question: '', answer: '' })
    }
  }, [show, mode, faq, setValue, reset])

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        question: data.question.trim(),
        answer: data.answer.trim(),
        isActive: data.isActive === 'active',
      }

      if (mode === 'add') {
        await createFAQ(payload).unwrap()
        toast.success('FAQ created successfully')
      } else {
        if (!faqId) {
          toast.error('FAQ ID not found')
          return
        }
        await updateFAQ({ id: faqId, data: payload }).unwrap()
        toast.success('FAQ updated successfully')
      }
      onSuccess()
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || `Failed to ${mode} FAQ`)
    }
  }

  const handleClose = () => {
    reset()
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <IconifyIcon icon={mode === 'add' ? 'solar:add-circle-bold' : 'solar:pen-2-broken'} className="me-2" />
          {mode === 'add' ? 'Add' : 'Edit'} FAQ
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <label className="form-label">
                Question <span className="text-danger">*</span>
              </label>
              <input
                {...register('question', { required: 'Question is required' })}
                className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                placeholder="Enter FAQ question"
              />
              {errors.question && <div className="invalid-feedback">{errors.question.message}</div>}
            </Col>

            <Col md={12}>
              <label className="form-label">
                Answer <span className="text-danger">*</span>
              </label>
              <textarea
                {...register('answer', { required: 'Answer is required' })}
                className={`form-control ${errors.answer ? 'is-invalid' : ''}`}
                rows={5}
                placeholder="Enter FAQ answer"
              />
              {errors.answer && <div className="invalid-feedback">{errors.answer.message}</div>}
            </Col>

            <Col md={12}>
              <label className="form-label">
                Status <span className="text-danger">*</span>
              </label>
              <div className="d-flex gap-3 align-items-center mt-1">
                <div className="form-check">
                  <input className="form-check-input" type="radio" value="active" id="faqStatusActive" {...register('isActive')} />
                  <label className="form-check-label" htmlFor="faqStatusActive">
                    Active
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" value="inactive" id="faqStatusInactive" {...register('isActive')} />
                  <label className="form-check-label" htmlFor="faqStatusInactive">
                    Inactive
                  </label>
                </div>
              </div>
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
                {mode === 'add' ? 'Create FAQ' : 'Update FAQ'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddEditFAQModal
