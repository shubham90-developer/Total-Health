'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Button, Card, CardFooter, CardHeader, CardTitle, Col, FormControl, InputGroup, Modal, Row, Spinner } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  ServiceItem,
} from '@/services/servicesApi'
import { confirmDelete } from '@/utils/sweetAlert'
import { toast } from 'react-toastify'

/** TYPES **/
type FormData = {
  image?: FileList
  title: string
  description: string
}

/** VALIDATION SCHEMA **/
const serviceSchema: yup.ObjectSchema<FormData> = yup.object({
  image: yup.mixed<FileList>().when('$mode', {
    is: 'add',
    then: (schema) => schema.test('required', 'Please upload an image', (value) => value && value.length > 0).required(),
    otherwise: (schema) => schema.optional(),
  }),
  title: yup.string().required('Please enter title'),
  description: yup.string().required('Please enter description'),
})

/** VIEW SERVICE MODAL **/
interface ViewServiceModalProps {
  show: boolean
  onHide: () => void
  serviceId: string | null
  services: ServiceItem[]
}

const ViewServiceModal: React.FC<ViewServiceModalProps> = ({ show, onHide, serviceId, services }) => {
  const service = services.find((s) => s._id === serviceId)

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
          Service Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!service ? (
          <div className="text-center py-4">
            <p className="text-muted">Service not found</p>
          </div>
        ) : (
          <Row className="g-3">
            <Col md={12}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Image</label>
                <div className="mt-2">
                  <Image
                    src={getImageUrl(service.image)}
                    alt="Service Image"
                    width={200}
                    height={200}
                    className="img-fluid rounded"
                    style={{ objectFit: 'cover', maxWidth: '100%' }}
                  />
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Title</label>
                <p className="mb-0 fs-5">{service.title}</p>
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Description</label>
                <p className="mb-0">{service.description}</p>
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

/** ADD/EDIT SERVICE MODAL **/
interface AddEditServiceModalProps {
  show: boolean
  onHide: () => void
  mode: 'add' | 'edit'
  serviceId: string | null
  services: ServiceItem[]
  onSuccess: () => void
}

const AddEditServiceModal: React.FC<AddEditServiceModalProps> = ({ show, onHide, mode, serviceId, services, onSuccess }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Mutations
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation()
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation()

  const isSubmitting = isCreating || isUpdating

  // Find the service being edited
  const service = mode === 'edit' ? services.find((s) => s._id === serviceId) : null

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(serviceSchema),
    context: { mode },
    defaultValues: {
      title: '',
      description: '',
    },
  })

  // Watch image field for preview
  const imageField = watch('image')

  useEffect(() => {
    if (imageField && imageField.length > 0) {
      const file = imageField[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [imageField])

  // Load service data when editing
  useEffect(() => {
    if (show && mode === 'edit' && service) {
      setValue('title', service.title)
      setValue('description', service.description)
      setPreviewImage(service.image)
    } else if (show && mode === 'add') {
      reset({ title: '', description: '' })
      setPreviewImage(null)
    }
  }, [show, mode, service, setValue, reset])

  const onSubmit = async (data: FormData) => {
    try {
      const formDataObj = new FormData()

      formDataObj.append('title', String(data.title || '').trim())
      formDataObj.append('description', String(data.description || '').trim())

      // Add image if provided
      if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
        formDataObj.append('image', data.image[0], data.image[0].name)
      } else if (mode === 'add') {
        toast.error('Please upload an image')
        return
      }

      if (mode === 'add') {
        // Create new service
        await createService(formDataObj).unwrap()
        toast.success('Service created successfully')
      } else {
        // Update existing service
        if (!serviceId) {
          toast.error('Service ID not found')
          return
        }

        await updateService({ serviceId, formData: formDataObj }).unwrap()
        toast.success('Service updated successfully')
      }

      onSuccess()
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || `Failed to ${mode} service`
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
          {mode === 'add' ? 'Add' : 'Edit'} Service
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <div className="mb-3">
                <TextFormInput control={control} type="text" name="title" label="Service Title" />
              </div>
            </Col>

            <Col md={12}>
              <div className="mb-3">
                <TextAreaFormInput control={control} name="description" label="Description" placeholder="Enter service description" rows={4} />
              </div>
            </Col>

            <Col md={12}>
              <div className="mb-3">
                <Controller
                  control={control}
                  name="image"
                  render={({ field: { onChange, value, ...field }, fieldState }) => (
                    <div>
                      <label className="form-label">Service Image {mode === 'add' && <span className="text-danger">*</span>}</label>
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
                      {mode === 'edit' && <small className="text-muted d-block mt-1">Leave empty to keep current image</small>}
                      {previewImage && (
                        <div className="mt-2">
                          <small className="text-muted">{mode === 'edit' ? 'Current' : 'Preview'} image:</small>
                          <div className="mt-1">
                            <Image
                              src={getImageUrl(previewImage)}
                              alt="Image preview"
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
                {mode === 'add' ? 'Create Service' : 'Update Service'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

/** MAIN COMPONENT **/
const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewModalShow, setViewModalShow] = useState(false)
  const [addEditModalShow, setAddEditModalShow] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // RTK Query Hooks
  const { data: servicesData, isLoading, isFetching, refetch } = useGetAllServicesQuery()
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation()

  const services = servicesData?.data || []

  // Add service handler
  const handleAdd = () => {
    setModalMode('add')
    setSelectedServiceId(null)
    setAddEditModalShow(true)
  }

  // Edit service handler
  const handleEdit = (id: string) => {
    setSelectedServiceId(id)
    setModalMode('edit')
    setAddEditModalShow(true)
  }

  // View service handler
  const handleView = (id: string) => {
    setSelectedServiceId(id)
    setViewModalShow(true)
  }

  // Delete handler
  const handleDelete = async (id: string, title: string) => {
    const confirmed = await confirmDelete('Delete Service?', `Are you sure you want to delete the service "${title}"? This action cannot be undone.`)
    if (!confirmed) return

    try {
      setDeletingId(id)
      await deleteService(id).unwrap()
      toast.success('Service deleted successfully')
      refetch()
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || 'Failed to delete service')
    } finally {
      setDeletingId(null)
    }
  }

  // Close modal handlers
  const handleCloseViewModal = () => {
    setViewModalShow(false)
    setSelectedServiceId(null)
  }

  const handleCloseAddEditModal = () => {
    setAddEditModalShow(false)
    setSelectedServiceId(null)
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

  const filteredServices = services.filter((service) => service.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <>
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center gap-1">
              <CardTitle as={'h4'} className="flex-grow-1">
                Services
              </CardTitle>

              <InputGroup style={{ maxWidth: '250px' }}>
                <FormControl placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </InputGroup>

              <Button variant="primary" size="lg" onClick={handleAdd}>
                <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                Add Service
              </Button>
            </CardHeader>

            <div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered table-bordered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{ width: 20 }}>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor="customCheck1" />
                        </div>
                      </th>
                      <th style={{ textWrap: 'nowrap' }}>Service Image</th>
                      <th style={{ textWrap: 'nowrap' }}>Service Title</th>
                      <th style={{ textWrap: 'nowrap' }}>Description</th>
                      <th style={{ textWrap: 'nowrap' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading || isFetching ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          <Spinner animation="border" variant="primary" />
                          <span className="ms-2">Loading services...</span>
                        </td>
                      </tr>
                    ) : filteredServices.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-muted">
                          {searchQuery ? 'No services found matching your search' : 'No services found'}
                        </td>
                      </tr>
                    ) : (
                      filteredServices.map((item, index) => (
                        <tr key={item._id}>
                          <td>
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" id={`customCheck${index + 2}`} />
                              <label className="form-check-label" htmlFor={`customCheck${index + 2}`} />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                <Image
                                  src={getImageUrl(item.image)}
                                  alt={item.title}
                                  width={60}
                                  height={60}
                                  className="avatar-md"
                                  style={{ objectFit: 'cover' }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>{item.title}</td>
                          <td style={{ maxWidth: '300px' }}>
                            {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button onClick={() => handleView(item._id!)} className="btn btn-soft-info btn-sm" title="View Details">
                                <IconifyIcon icon="solar:eye-bold" className="align-middle fs-18" />
                              </button>
                              <button onClick={() => handleEdit(item._id!)} className="btn btn-soft-primary btn-sm" title="Edit">
                                <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id!, item.title)}
                                className="btn btn-soft-danger btn-sm"
                                disabled={isDeleting && deletingId === item._id}
                                title="Delete">
                                {isDeleting && deletingId === item._id ? (
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
            </div>

            <CardFooter className="border-top">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </CardFooter>
          </Card>
        </Col>
      </Row>

      {/* View Modal */}
      <ViewServiceModal show={viewModalShow} onHide={handleCloseViewModal} serviceId={selectedServiceId} services={services} />

      {/* Add/Edit Modal */}
      <AddEditServiceModal
        show={addEditModalShow}
        onHide={handleCloseAddEditModal}
        mode={modalMode}
        serviceId={selectedServiceId}
        services={services}
        onSuccess={handleSuccess}
      />
    </>
  )
}

export default Services
