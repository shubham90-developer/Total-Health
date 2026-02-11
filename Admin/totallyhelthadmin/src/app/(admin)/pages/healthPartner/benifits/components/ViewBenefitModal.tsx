'use client'

import React from 'react'
import { Modal, Row, Col, Spinner, Badge } from 'react-bootstrap'
import Image from 'next/image'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { BenefitItem } from '@/services/healthPartnerApi'

interface ViewBenefitModalProps {
  show: boolean
  onHide: () => void
  benefitId: string | null
  benefitType: 'company' | 'employee'
  benefits: BenefitItem[]
}

const ViewBenefitModal: React.FC<ViewBenefitModalProps> = ({ show, onHide, benefitId, benefitType, benefits }) => {
  // Find benefit from the benefits array passed as prop
  const benefit = benefits.find((b) => b._id === benefitId)

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.png'
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    return imagePath
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <IconifyIcon icon="solar:document-bold" className="me-2" />
          {benefitType === 'company' ? 'Company' : 'Employee'} Benefit Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!benefit ? (
          <div className="text-center py-4">
            <p className="text-muted">Benefit not found</p>
          </div>
        ) : (
          <Row className="g-3">
            <Col md={12}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Icon</label>
                <div className="mt-2">
                  <Image
                    src={getImageUrl(benefit.icon)}
                    alt="Benefit Icon"
                    width={100}
                    height={100}
                    className="img-fluid rounded"
                    style={{ objectFit: 'cover', maxWidth: '100%' }}
                  />
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Text</label>
                <p className="mb-0">{benefit.text}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Status</label>
                <div>
                  <Badge bg={benefit.status === 'active' ? 'success' : 'danger'}>
                    {benefit.status.charAt(0).toUpperCase() + benefit.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewBenefitModal
