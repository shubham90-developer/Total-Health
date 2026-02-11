'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, Col, Row, Spinner, Button } from 'react-bootstrap'
import { useGetAllFAQsQuery, useDeleteFAQMutation, FAQItem } from '@/services/faqApi'
import { confirmDelete } from '@/utils/sweetAlert'
import { toast } from 'react-toastify'

import ViewFAQModal from './view'
import AddEditFAQModal from './addEdit'

const FAQs = () => {
  const [viewModalShow, setViewModalShow] = useState(false)
  const [addEditModalShow, setAddEditModalShow] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data: faqsResponse, isLoading, isFetching, refetch } = useGetAllFAQsQuery()
  const [deleteFAQ, { isLoading: isDeleting }] = useDeleteFAQMutation()

  const faqs: FAQItem[] = faqsResponse?.data || []

  const handleAdd = () => {
    setModalMode('add')
    setSelectedFaqId(null)
    setAddEditModalShow(true)
  }

  const handleEdit = (id: string) => {
    setSelectedFaqId(id)
    setModalMode('edit')
    setAddEditModalShow(true)
  }

  const handleView = (id: string) => {
    setSelectedFaqId(id)
    setViewModalShow(true)
  }

  const handleDelete = async (faq: FAQItem) => {
    const confirmed = await confirmDelete('Delete FAQ?', `Are you sure you want to delete this FAQ? This action cannot be undone.`)
    if (!confirmed) return

    try {
      setDeletingId(faq._id)
      await deleteFAQ(faq._id).unwrap()
      toast.success('FAQ deleted successfully')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Failed to delete FAQ')
    } finally {
      setDeletingId(null)
    }
  }

  const handleCloseViewModal = () => {
    setViewModalShow(false)
    setSelectedFaqId(null)
  }

  const handleCloseAddEditModal = () => {
    setAddEditModalShow(false)
    setSelectedFaqId(null)
  }

  const handleSuccess = () => {
    refetch()
    handleCloseAddEditModal()
  }

  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center gap-1">
              <CardTitle as={'h4'} className="flex-grow-1">
                All FAQ List
              </CardTitle>
              <Button variant="primary" size="lg" onClick={handleAdd}>
                <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                Add FAQ
              </Button>
            </CardHeader>

            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        <Spinner animation="border" variant="primary" />
                        <span className="ms-2">Loading FAQs...</span>
                      </td>
                    </tr>
                  ) : faqs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-muted">
                        No FAQs found
                      </td>
                    </tr>
                  ) : (
                    faqs.map((faq) => (
                      <tr key={faq._id}>
                        <td style={{ maxWidth: 280 }}>
                          <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {faq.question}
                          </span>
                        </td>
                        <td style={{ maxWidth: 340 }}>
                          <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {faq.answer}
                          </span>
                        </td>
                        <td>
                          <span className={`fw-medium ${faq.isActive ? 'text-success' : 'text-danger'}`}>{faq.isActive ? 'Active' : 'Inactive'}</span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button onClick={() => handleView(faq._id)} className="btn btn-soft-info btn-sm" title="View Details">
                              <IconifyIcon icon="solar:eye-bold" className="align-middle fs-18" />
                            </button>
                            <button onClick={() => handleEdit(faq._id)} className="btn btn-soft-primary btn-sm" title="Edit">
                              <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </button>
                            <button
                              onClick={() => handleDelete(faq)}
                              className="btn btn-soft-danger btn-sm"
                              disabled={isDeleting && deletingId === faq._id}
                              title="Delete">
                              {isDeleting && deletingId === faq._id ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>

      <ViewFAQModal show={viewModalShow} onHide={handleCloseViewModal} faqId={selectedFaqId} faqs={faqs} />

      <AddEditFAQModal
        show={addEditModalShow}
        onHide={handleCloseAddEditModal}
        mode={modalMode}
        faqId={selectedFaqId}
        faqs={faqs}
        onSuccess={handleSuccess}
      />
    </>
  )
}

export default FAQs
