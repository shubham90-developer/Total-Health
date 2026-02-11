'use client'

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Modal, Row, Spinner } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { confirmDelete, showSuccess, showError } from '@/utils/sweetAlert'
import {
  useGetRestoBannersQuery,
  useGetRestoBannerByIdQuery,
  useCreateRestoBannerMutation,
  useUpdateRestoBannerMutation,
  useDeleteRestoBannerMutation,
  restoBannerApi,
  type RestoBanner,
} from '@/services/restoBanner'

type AddFormData = {
  file: FileList
  status: string
}

type EditFormData = {
  file?: FileList
  status: string
}

const addSchema: yup.ObjectSchema<AddFormData> = yup.object({
  file: yup
    .mixed<FileList>()
    .test('required', 'Please upload a banner image', (v) => !!v && v.length > 0)
    .required(),
  status: yup.string().required('Please select a status'),
})

const editSchema: yup.ObjectSchema<EditFormData> = yup.object({
  file: yup.mixed<FileList>().optional(),
  status: yup.string().required('Please select a status'),
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.png'
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return path
}

// ─── Status Radio ─────────────────────────────────────────────────────────────

const StatusRadio = ({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) => (
  <div>
    <label className="form-label">Status</label>
    <div className="d-flex gap-3 align-items-center">
      {(['active', 'inactive'] as const).map((s) => (
        <div className="form-check" key={s}>
          <input className="form-check-input" type="radio" id={`status-${s}`} value={s} checked={value === s} onChange={() => onChange(s)} />
          <label className="form-check-label text-capitalize" htmlFor={`status-${s}`}>
            {s}
          </label>
        </div>
      ))}
    </div>
    {error && <small className="text-danger">{error}</small>}
  </div>
)

// ─── View Modal ───────────────────────────────────────────────────────────────

const ViewRestoBannerModal = ({ show, onHide, bannerId }: { show: boolean; onHide: () => void; bannerId: string | null }) => {
  const { data: banner, isLoading } = useGetRestoBannerByIdQuery(bannerId ?? '', {
    skip: !bannerId,
  })

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <IconifyIcon icon="solar:document-bold" className="me-2" />
          Banner Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading...</p>
          </div>
        ) : banner ? (
          <Row className="g-3">
            <Col md={6}>
              <label className="form-label fw-semibold text-muted">Status</label>
              <div>
                <Badge bg={banner.status === 'active' ? 'success' : 'danger'}>{banner.status.charAt(0).toUpperCase() + banner.status.slice(1)}</Badge>
              </div>
            </Col>
            <Col md={6}>
              <label className="form-label fw-semibold text-muted">ID</label>
              <p className="mb-0 font-monospace small">{banner._id}</p>
            </Col>
            <Col md={12}>
              <label className="form-label fw-semibold text-muted">Banner Image</label>
              <div className="mt-2">
                <Image
                  src={getImageUrl(banner.image)}
                  alt="Banner"
                  width={400}
                  height={200}
                  className="img-fluid rounded"
                  style={{ objectFit: 'cover', maxWidth: '100%' }}
                />
              </div>
            </Col>
          </Row>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">Banner not found</p>
          </div>
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

// ─── Add Modal ────────────────────────────────────────────────────────────────

const AddRestoBannerModal = ({ show, onHide }: { show: boolean; onHide: () => void }) => {
  const dispatch = useDispatch()
  const [createBanner] = useCreateRestoBannerMutation()
  const [preview, setPreview] = useState<string | null>(null)

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AddFormData>({
    resolver: yupResolver(addSchema),
    defaultValues: { status: 'active' },
  })

  const handleClose = () => {
    reset()
    setPreview(null)
    onHide()
  }

  const onSubmit = async (data: AddFormData) => {
    try {
      const file = data.file[0]
      if (!file || !(file instanceof File)) {
        showError('Invalid image file')
        return
      }

      const fd = new FormData()
      fd.append('file', file, file.name)
      fd.append('status', data.status)

      await createBanner(fd).unwrap()

      dispatch(restoBannerApi.util.invalidateTags([{ type: 'RestoBanner' as const, id: 'LIST' }]))

      toast.success('Banner created successfully')
      handleClose()
    } catch (error: any) {
      showError(error?.data?.message || error?.message || 'Failed to create banner')
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Resto Banner</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <label className="form-label">
                Banner Image <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className={`form-control ${errors.file ? 'is-invalid' : ''}`}
                {...register('file', {
                  onChange: (e) => {
                    const f = e.target.files?.[0]
                    if (f) setPreview(URL.createObjectURL(f))
                  },
                })}
              />
              {errors.file && <div className="invalid-feedback">{errors.file.message}</div>}
              {preview && (
                <div className="mt-2">
                  <Image src={preview} alt="preview" width={300} height={150} className="img-fluid rounded" style={{ objectFit: 'cover' }} />
                </div>
              )}
            </Col>
            <Col md={12}>
              <Controller
                control={control}
                name="status"
                render={({ field }) => <StatusRadio value={field.value} onChange={field.onChange} error={errors.status?.message} />}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                Creating...
              </>
            ) : (
              'Add Banner'
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

const EditRestoBannerModal = ({ show, onHide, banner }: { show: boolean; onHide: () => void; banner: RestoBanner | null }) => {
  const dispatch = useDispatch()
  const [updateBanner] = useUpdateRestoBannerMutation()
  const [preview, setPreview] = useState<string | null>(null)

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<EditFormData>({
    resolver: yupResolver(editSchema),
    defaultValues: { status: 'active' },
  })

  // Populate form when banner changes
  useEffect(() => {
    if (banner) {
      reset({ status: banner.status })
      setPreview(null)
    }
  }, [banner, reset])

  const handleClose = () => {
    reset()
    setPreview(null)
    onHide()
  }

  const onSubmit = async (data: EditFormData) => {
    if (!banner) return
    try {
      const fd = new FormData()
      fd.append('status', data.status)

      if (data.file && data.file.length > 0 && data.file[0] instanceof File) {
        fd.append('file', data.file[0], data.file[0].name)
      }

      await updateBanner({ id: banner._id, data: fd }).unwrap()

      dispatch(
        restoBannerApi.util.invalidateTags([
          { type: 'RestoBanner' as const, id: banner._id },
          { type: 'RestoBanner' as const, id: 'LIST' },
        ]),
      )

      toast.success('Banner updated successfully')
      handleClose()
    } catch (error: any) {
      showError(error?.data?.message || error?.message || 'Failed to update banner')
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Resto Banner</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <label className="form-label">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                className={`form-control ${errors.file ? 'is-invalid' : ''}`}
                {...register('file', {
                  onChange: (e) => {
                    const f = e.target.files?.[0]
                    if (f) setPreview(URL.createObjectURL(f))
                  },
                })}
              />
              {errors.file && <div className="invalid-feedback">{errors.file.message}</div>}
              {/* Show new preview or existing image */}
              {(preview || banner?.image) && (
                <div className="mt-2">
                  <small className="text-muted d-block mb-1">{preview ? 'New image:' : 'Current image:'}</small>
                  <Image
                    src={preview ?? getImageUrl(banner!.image)}
                    alt="banner"
                    width={300}
                    height={150}
                    className="img-fluid rounded"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </Col>
            <Col md={12}>
              <Controller
                control={control}
                name="status"
                render={({ field }) => <StatusRadio value={field.value} onChange={field.onChange} error={errors.status?.message} />}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

// ─── Main List Component ──────────────────────────────────────────────────────

const RestoBanner = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)

  const [viewShow, setViewShow] = useState(false)
  const [addShow, setAddShow] = useState(false)
  const [editShow, setEditShow] = useState(false)

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [editTarget, setEditTarget] = useState<RestoBanner | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const {
    data: bannersResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetRestoBannersQuery(statusFilter ? { status: statusFilter as 'active' | 'inactive' } : undefined)
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteRestoBannerMutation()

  const banners = bannersResponse?.data ?? []

  const handleView = (id: string) => {
    setSelectedId(id)
    setViewShow(true)
  }

  const handleEdit = (banner: RestoBanner) => {
    setEditTarget(banner)
    setEditShow(true)
  }

  const handleDelete = async (id: string) => {
    const confirmed = await confirmDelete('Delete Banner?', 'This will permanently delete the banner and its image. This action cannot be undone.')
    if (!confirmed) return

    try {
      setDeletingId(id)
      await deleteBanner(id).unwrap()
      toast.success('Banner deleted successfully')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Failed to delete banner')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center gap-1">
              <CardTitle as="h4" className="flex-grow-1">
                Resto Banners
              </CardTitle>

              {/* Status filter */}
              <div className="d-flex gap-2 me-2">
                {[
                  { label: 'All', value: undefined },
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ].map(({ label, value }) => (
                  <button
                    key={label}
                    className={`btn btn-sm ${statusFilter === value ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setStatusFilter(value)}>
                    {label}
                  </button>
                ))}
              </div>

              <button className="btn btn-primary" onClick={() => setAddShow(true)}>
                Add Banner
              </button>
            </CardHeader>

            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        <Spinner animation="border" variant="primary" />
                        <span className="ms-2">Loading banners...</span>
                      </td>
                    </tr>
                  ) : banners.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-muted">
                        No banners found
                      </td>
                    </tr>
                  ) : (
                    banners.map((banner, idx) => (
                      <tr key={banner._id}>
                        <td>{idx + 1}</td>
                        <td>
                          <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center overflow-hidden">
                            <Image src={getImageUrl(banner.image)} alt="banner" width={60} height={60} style={{ objectFit: 'cover' }} />
                          </div>
                        </td>
                        <td>
                          <span className={`fw-medium ${banner.status === 'active' ? 'text-success' : 'text-danger'}`}>
                            {banner.status.charAt(0).toUpperCase() + banner.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button onClick={() => handleView(banner._id)} className="btn btn-soft-info btn-sm" title="View">
                              <IconifyIcon icon="solar:eye-bold" className="align-middle fs-18" />
                            </button>
                            <button onClick={() => handleEdit(banner)} className="btn btn-soft-primary btn-sm" title="Edit">
                              <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </button>
                            <button
                              onClick={() => handleDelete(banner._id)}
                              className="btn btn-soft-danger btn-sm"
                              disabled={isDeleting && deletingId === banner._id}
                              title="Delete">
                              {isDeleting && deletingId === banner._id ? (
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

            {banners.length > 0 && (
              <CardFooter className="border-top">
                <nav>
                  <ul className="pagination justify-content-end mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                        Previous
                      </button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(1)}>
                        1
                      </button>
                    </li>
                    {banners.length > 10 && (
                      <li className={`page-item ${currentPage === 2 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(2)}>
                          2
                        </button>
                      </li>
                    )}
                    <li className={`page-item ${banners.length <= 10 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={banners.length <= 10}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </CardFooter>
            )}
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <ViewRestoBannerModal
        show={viewShow}
        onHide={() => {
          setViewShow(false)
          setSelectedId(null)
        }}
        bannerId={selectedId}
      />
      <AddRestoBannerModal show={addShow} onHide={() => setAddShow(false)} />
      <EditRestoBannerModal
        show={editShow}
        onHide={() => {
          setEditShow(false)
          setEditTarget(null)
        }}
        banner={editTarget}
      />
    </>
  )
}

export default RestoBanner
