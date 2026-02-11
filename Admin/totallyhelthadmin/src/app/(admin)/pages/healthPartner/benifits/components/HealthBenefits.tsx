'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, Col, Row, Spinner, Nav, Tab, Button } from 'react-bootstrap'
import { useGetHealthQuery, useDeleteCompanyBenefitMutation, useDeleteEmployeeBenefitMutation } from '@/services/healthPartnerApi'

import { confirmDelete } from '@/utils/sweetAlert'
import { toast } from 'react-toastify'
import ViewBenefitModal from './ViewBenefitModal'
import AddEditBenefitModal from './AddEditBenefitModal'

const HealthBenefits = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'employee'>('company')
  const [viewModalShow, setViewModalShow] = useState(false)
  const [addEditModalShow, setAddEditModalShow] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selectedBenefitId, setSelectedBenefitId] = useState<string | null>(null)
  const [selectedBenefitType, setSelectedBenefitType] = useState<'company' | 'employee'>('company')

  // Fetch all health data
  const { data: healthResponse, isLoading, isFetching, refetch } = useGetHealthQuery()
  const [deleteCompanyBenefit, { isLoading: isDeletingCompany }] = useDeleteCompanyBenefitMutation()
  const [deleteEmployeeBenefit, { isLoading: isDeletingEmployee }] = useDeleteEmployeeBenefitMutation()

  const companyBenefits = healthResponse?.data?.BenefitForCompanies?.benefits || []
  const employeeBenefits = healthResponse?.data?.BenefitForEmployees?.benefits || []
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Add benefit handler
  const handleAdd = (type: 'company' | 'employee') => {
    setSelectedBenefitType(type)
    setModalMode('add')
    setSelectedBenefitId(null)
    setAddEditModalShow(true)
  }

  // Edit benefit handler
  const handleEdit = (id: string, type: 'company' | 'employee') => {
    setSelectedBenefitId(id)
    setSelectedBenefitType(type)
    setModalMode('edit')
    setAddEditModalShow(true)
  }

  // View benefit handler
  const handleView = (id: string, type: 'company' | 'employee') => {
    setSelectedBenefitId(id)
    setSelectedBenefitType(type)
    setViewModalShow(true)
  }

  // Delete handlers
  const handleDeleteCompany = async (id: string, text: string) => {
    const confirmed = await confirmDelete(
      'Delete Company Benefit?',
      `Are you sure you want to delete the benefit "${text}"? This action cannot be undone.`,
    )
    if (!confirmed) return

    try {
      setDeletingId(id)
      await deleteCompanyBenefit(id).unwrap()
      toast.success('Company benefit deleted successfully')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Failed to delete company benefit')
    } finally {
      setDeletingId(null)
    }
  }

  const handleDeleteEmployee = async (id: string, text: string) => {
    const confirmed = await confirmDelete(
      'Delete Employee Benefit?',
      `Are you sure you want to delete the benefit "${text}"? This action cannot be undone.`,
    )
    if (!confirmed) return

    try {
      setDeletingId(id)
      await deleteEmployeeBenefit(id).unwrap()
      toast.success('Employee benefit deleted successfully')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Failed to delete employee benefit')
    } finally {
      setDeletingId(null)
    }
  }

  // Close modal handlers
  const handleCloseViewModal = () => {
    setViewModalShow(false)
    setSelectedBenefitId(null)
  }

  const handleCloseAddEditModal = () => {
    setAddEditModalShow(false)
    setSelectedBenefitId(null)
  }

  const handleSuccess = () => {
    refetch()
    handleCloseAddEditModal()
  }

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.png'
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    return imagePath
  }

  const renderBenefitsTable = (benefits: any[], isDeleting: boolean, onDelete: (id: string, text: string) => void, type: 'company' | 'employee') => (
    <div className="table-responsive">
      <table className="table align-middle mb-0 table-hover table-centered">
        <thead className="bg-light-subtle">
          <tr>
            <th>Icon</th>
            <th>Text</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || isFetching ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading benefits...</span>
              </td>
            </tr>
          ) : benefits.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-muted">
                No benefits found
              </td>
            </tr>
          ) : (
            benefits.map((benefit: any) => (
              <tr key={benefit._id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                      <Image
                        src={getImageUrl(benefit.icon)}
                        alt={benefit.text}
                        className="avatar-md"
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </td>
                <td>{benefit.text}</td>
                <td>
                  <span className={`fw-medium ${benefit.status === 'active' ? 'text-success' : 'text-danger'}`}>
                    {benefit.status.charAt(0).toUpperCase() + benefit.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleView(benefit._id, type)} className="btn btn-soft-info btn-sm" title="View Details">
                      <IconifyIcon icon="solar:eye-bold" className="align-middle fs-18" />
                    </button>
                    <button onClick={() => handleEdit(benefit._id, type)} className="btn btn-soft-primary btn-sm" title="Edit">
                      <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </button>
                    <button
                      onClick={() => onDelete(benefit._id, benefit.text)}
                      className="btn btn-soft-danger btn-sm"
                      disabled={isDeleting && deletingId === benefit._id}
                      title="Delete">
                      {isDeleting && deletingId === benefit._id ? (
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
  )

  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center gap-1">
              <CardTitle as={'h4'} className="flex-grow-1">
                Health Benefits
              </CardTitle>
            </CardHeader>

            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k as 'company' | 'employee')}>
              <Nav variant="tabs" className="nav-bordered px-3">
                <Nav.Item>
                  <Nav.Link eventKey="company">
                    <IconifyIcon icon="solar:buildings-2-bold" className="me-1" />
                    Company Benefits
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="employee">
                    <IconifyIcon icon="solar:users-group-rounded-bold" className="me-1" />
                    Employee Benefits
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="company">
                  <div className="p-3">
                    <div className="d-flex justify-content-end mb-3">
                      <Button variant="primary" size="lg" onClick={() => handleAdd('company')}>
                        <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                        Add Company Benefit
                      </Button>
                    </div>
                    {renderBenefitsTable(companyBenefits, isDeletingCompany, handleDeleteCompany, 'company')}
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="employee">
                  <div className="p-3">
                    <div className="d-flex justify-content-end mb-3">
                      <Button variant="primary" size="lg" onClick={() => handleAdd('employee')}>
                        <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                        Add Employee Benefit
                      </Button>
                    </div>
                    {renderBenefitsTable(employeeBenefits, isDeletingEmployee, handleDeleteEmployee, 'employee')}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card>
        </Col>
      </Row>

      {/* View Modal */}
      <ViewBenefitModal
        show={viewModalShow}
        onHide={handleCloseViewModal}
        benefitId={selectedBenefitId}
        benefitType={selectedBenefitType}
        benefits={selectedBenefitType === 'company' ? companyBenefits : employeeBenefits}
      />

      {/* Add/Edit Modal */}
      <AddEditBenefitModal
        show={addEditModalShow}
        onHide={handleCloseAddEditModal}
        mode={modalMode}
        benefitId={selectedBenefitId}
        benefitType={selectedBenefitType}
        benefits={selectedBenefitType === 'company' ? companyBenefits : employeeBenefits}
        onSuccess={handleSuccess}
      />
    </>
  )
}

export default HealthBenefits
