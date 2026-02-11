'use client'

import React from 'react'
import { Modal, Row, Col, Badge } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { FAQItem } from '@/services/faqApi'

interface ViewFAQModalProps {
  show: boolean
  onHide: () => void
  faqId: string | null
  faqs: FAQItem[]
}

const ViewFAQModal: React.FC<ViewFAQModalProps> = ({ show, onHide, faqId, faqs }) => {
  const faq = faqs.find((f) => f._id === faqId)

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <IconifyIcon icon="solar:document-bold" className="me-2" />
          FAQ Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!faq ? (
          <div className="text-center py-4">
            <p className="text-muted">FAQ not found</p>
          </div>
        ) : (
          <Row className="g-3">
            <Col md={12}>
              <label className="form-label fw-semibold text-muted">Question</label>
              <p className="mb-0">{faq.question}</p>
            </Col>
            <Col md={12}>
              <label className="form-label fw-semibold text-muted">Answer</label>
              <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                {faq.answer}
              </p>
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold text-muted">Status</label>
              <div>
                <Badge bg={faq.isActive ? 'success' : 'danger'}>{faq.isActive ? 'Active' : 'Inactive'}</Badge>
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

export default ViewFAQModal
