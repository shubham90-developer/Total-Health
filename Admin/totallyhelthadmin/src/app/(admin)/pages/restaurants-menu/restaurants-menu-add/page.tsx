'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, Col, Row, Spinner, Nav, Tab, Button, Modal, Badge } from 'react-bootstrap'
import Image from 'next/image'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TextAreaFormInput from '@/components/form/TextAreaFormInput'
import { confirmDelete } from '@/utils/sweetAlert'

import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllMenuItemsQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  CategoryItem,
  MenuItemType,
} from '@/services/menu-itemsAPi'

type CategoryFormData = {
  title: string
  description?: string
  image?: FileList
}

type ChoiceOptionForm = {
  name: string
  price: number
}

type MenuItemFormData = {
  title: string
  description: string
  categoryId: string
  price: number
  quantity?: number
  nutrition?: string
  images?: FileList
  isAvailable?: boolean
  choice1?: ChoiceOptionForm[]
  choice2?: ChoiceOptionForm[]
  choice3?: ChoiceOptionForm[]
  choice4?: ChoiceOptionForm[]
}

const categorySchema: yup.ObjectSchema<CategoryFormData> = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().optional(),
  image: yup.mixed<FileList>().optional(),
})

const menuItemSchema: yup.ObjectSchema<MenuItemFormData> = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  categoryId: yup.string().required('Category is required'),
  price: yup.number().typeError('Price must be a number').required('Price is required').min(0),
  quantity: yup.number().optional(),
  nutrition: yup.string().optional(),
  images: yup.mixed<FileList>().optional(),
  isAvailable: yup.boolean().optional(),
  choice1: yup
    .array(
      yup
        .object({
          name: yup.string().required('Name required'),
          price: yup.number().typeError('Price must be a number').required('Price required').min(0),
        })
        .required(),
    )
    .optional(),
  choice2: yup
    .array(
      yup
        .object({
          name: yup.string().required('Name required'),
          price: yup.number().typeError('Price must be a number').required('Price required').min(0),
        })
        .required(),
    )
    .optional(),
  choice3: yup
    .array(
      yup
        .object({
          name: yup.string().required('Name required'),
          price: yup.number().typeError('Price must be a number').required('Price required').min(0),
        })
        .required(),
    )
    .optional(),
  choice4: yup
    .array(
      yup
        .object({
          name: yup.string().required('Name required'),
          price: yup.number().typeError('Price must be a number').required('Price required').min(0),
        })
        .required(),
    )
    .optional(),
})

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const getImageUrl = (path?: string) => {
  if (!path) return '/placeholder.png'
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path
  return path
}

const getCategoryId = (cat: CategoryItem | string | undefined): string => {
  if (!cat) return ''
  if (typeof cat === 'string') return cat
  return cat._id
}

const getCategoryTitle = (cat: CategoryItem | string | undefined, categories: CategoryItem[]): string => {
  if (!cat) return '—'
  if (typeof cat === 'string') {
    return categories.find((c) => c._id === cat)?.title ?? cat
  }
  return cat.title
}

// ─────────────────────────────────────────────
// CATEGORY ADD/EDIT MODAL
// ─────────────────────────────────────────────

interface CategoryModalProps {
  show: boolean
  onHide: () => void
  mode: 'add' | 'edit'
  category: CategoryItem | null
  onSuccess: () => void
}

const CategoryModal: React.FC<CategoryModalProps> = ({ show, onHide, mode, category, onSuccess }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
  const isSubmitting = isCreating || isUpdating

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CategoryFormData>({ resolver: yupResolver(categorySchema) })

  const imageField = watch('image')

  useEffect(() => {
    if (imageField && imageField.length > 0) {
      const reader = new FileReader()
      reader.onloadend = () => setPreviewImage(reader.result as string)
      reader.readAsDataURL(imageField[0])
    }
  }, [imageField])

  useEffect(() => {
    if (show && mode === 'edit' && category) {
      setValue('title', category.title)
      setValue('description', category.description || '')
      setPreviewImage(category.image || null)
    } else if (show && mode === 'add') {
      reset()
      setPreviewImage(null)
    }
  }, [show, mode, category, setValue, reset])

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const fd = new FormData()
      fd.append('title', data.title.trim())
      if (data.description) fd.append('description', data.description.trim())
      if (data.image && data.image.length > 0) fd.append('image', data.image[0], data.image[0].name)

      if (mode === 'add') {
        await createCategory(fd).unwrap()
        toast.success('Category created successfully')
      } else {
        if (!category?._id) return
        await updateCategory({ id: category._id, formData: fd }).unwrap()
        toast.success('Category updated successfully')
      }
      onSuccess()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || `Failed to ${mode} category`)
    }
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
          {mode === 'add' ? 'Add' : 'Edit'} Category
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <label className="form-label">
                Title <span className="text-danger">*</span>
              </label>
              <input {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} placeholder="Enter category title" />
              {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
            </Col>

            <Col md={12}>
              <label className="form-label">Description</label>
              <textarea {...register('description')} className="form-control" rows={3} placeholder="Enter category description" />
            </Col>

            <Col md={12}>
              <label className="form-label">Image</label>
              <Controller
                control={control}
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <div>
                    <input {...field} type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} className="form-control" />
                    {previewImage && (
                      <div className="mt-2">
                        <small className="text-muted">{mode === 'edit' ? 'Current' : 'Preview'}:</small>
                        <div className="mt-1">
                          <Image
                            src={getImageUrl(previewImage)}
                            alt="Preview"
                            width={100}
                            height={100}
                            style={{ objectFit: 'cover', borderRadius: 4 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
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
                {mode === 'add' ? 'Create Category' : 'Update Category'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

// ─────────────────────────────────────────────
// MENU ITEM ADD/EDIT MODAL
// ─────────────────────────────────────────────

interface MenuItemModalProps {
  show: boolean
  onHide: () => void
  mode: 'add' | 'edit'
  menuItem: MenuItemType | null
  categories: CategoryItem[]
  onSuccess: () => void
}

const MenuItemModal: React.FC<MenuItemModalProps> = ({ show, onHide, mode, menuItem, categories, onSuccess }) => {
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [openChoices, setOpenChoices] = useState<Record<string, boolean>>({})

  const [createMenuItem, { isLoading: isCreating }] = useCreateMenuItemMutation()
  const [updateMenuItem, { isLoading: isUpdating }] = useUpdateMenuItemMutation()
  const isSubmitting = isCreating || isUpdating

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<MenuItemFormData>({
    resolver: yupResolver(menuItemSchema),
    defaultValues: { isAvailable: true, quantity: 1, choice1: [], choice2: [], choice3: [], choice4: [] },
  })

  const { fields: c1Fields, append: appendC1, remove: removeC1 } = useFieldArray({ control, name: 'choice1' })
  const { fields: c2Fields, append: appendC2, remove: removeC2 } = useFieldArray({ control, name: 'choice2' })
  const { fields: c3Fields, append: appendC3, remove: removeC3 } = useFieldArray({ control, name: 'choice3' })
  const { fields: c4Fields, append: appendC4, remove: removeC4 } = useFieldArray({ control, name: 'choice4' })

  const choiceGroups = [
    { label: 'Choice 1', key: 'choice1', fields: c1Fields, append: () => appendC1({ name: '', price: 0 }), remove: removeC1 },
    { label: 'Choice 2', key: 'choice2', fields: c2Fields, append: () => appendC2({ name: '', price: 0 }), remove: removeC2 },
    { label: 'Choice 3', key: 'choice3', fields: c3Fields, append: () => appendC3({ name: '', price: 0 }), remove: removeC3 },
    { label: 'Choice 4', key: 'choice4', fields: c4Fields, append: () => appendC4({ name: '', price: 0 }), remove: removeC4 },
  ] as const

  const imagesField = watch('images')

  useEffect(() => {
    if (imagesField && imagesField.length > 0) {
      const previews: string[] = []
      const files = Array.from(imagesField)
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => previews.push(reader.result as string)
        reader.readAsDataURL(file)
      })
      setTimeout(() => setPreviewImages([...previews]), 200)
    }
  }, [imagesField])

  useEffect(() => {
    if (show && mode === 'edit' && menuItem) {
      setValue('title', menuItem.title)
      setValue('description', menuItem.description)
      setValue('categoryId', getCategoryId(menuItem.categoryId))
      setValue('price', menuItem.price)
      setValue('quantity', menuItem.quantity ?? 1)
      setValue('nutrition', menuItem.nutritionFacts?.nutrition || '')
      setValue('isAvailable', menuItem.isAvailable)
      setValue('choice1', menuItem.choices?.choice1 || [])
      setValue('choice2', menuItem.choices?.choice2 || [])
      setValue('choice3', menuItem.choices?.choice3 || [])
      setValue('choice4', menuItem.choices?.choice4 || [])
      setPreviewImages(menuItem.images || [])
    } else if (show && mode === 'add') {
      reset({ isAvailable: true, quantity: 1, choice1: [], choice2: [], choice3: [], choice4: [] })
      setPreviewImages([])
      setOpenChoices({})
    }
  }, [show, mode, menuItem, setValue, reset])

  const onSubmit = async (data: MenuItemFormData) => {
    try {
      const fd = new FormData()
      fd.append('title', data.title.trim())
      fd.append('description', data.description.trim())
      fd.append('categoryId', data.categoryId)
      fd.append('price', String(data.price))
      fd.append('quantity', String(data.quantity ?? 1))
      fd.append('isAvailable', String(data.isAvailable ?? true))
      if (data.nutrition) fd.append('nutritionFacts[nutrition]', data.nutrition.trim())

      // Choices
      const choiceKeys = ['choice1', 'choice2', 'choice3', 'choice4'] as const
      choiceKeys.forEach((key) => {
        const arr = data[key] || []
        arr.forEach((opt, idx) => {
          fd.append(`choices[${key}][${idx}][name]`, opt.name)
          fd.append(`choices[${key}][${idx}][price]`, String(opt.price))
        })
      })

      // Images
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => fd.append('images', file, file.name))
      }

      if (mode === 'add') {
        await createMenuItem(fd).unwrap()
        toast.success('Menu item created successfully')
      } else {
        if (!menuItem?._id) return
        await updateMenuItem({ id: menuItem._id, formData: fd }).unwrap()
        toast.success('Menu item updated successfully')
      }
      onSuccess()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || `Failed to ${mode} menu item`)
    }
  }

  const handleClose = () => {
    reset()
    setPreviewImages([])
    setOpenChoices({})
    onHide()
  }

  const toggleChoice = (key: string) => setOpenChoices((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <IconifyIcon icon={mode === 'add' ? 'solar:add-circle-bold' : 'solar:pen-2-broken'} className="me-2" />
          {mode === 'add' ? 'Add' : 'Edit'} Menu Item
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            {/* Title */}
            <Col md={6}>
              <label className="form-label">
                Title <span className="text-danger">*</span>
              </label>
              <input
                {...register('title')}
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                placeholder="e.g. Grilled Chicken Burger"
              />
              {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
            </Col>

            {/* Category */}
            <Col md={6}>
              <label className="form-label">
                Category <span className="text-danger">*</span>
              </label>
              <select {...register('categoryId')} className={`form-select ${errors.categoryId ? 'is-invalid' : ''}`}>
                <option value="">Select category…</option>
                {categories
                  .filter((c) => c.isActive)
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
              </select>
              {errors.categoryId && <div className="invalid-feedback">{errors.categoryId.message}</div>}
            </Col>

            {/* Description */}
            <Col md={12}>
              <TextAreaFormInput control={control} name="description" label="Description" placeholder="Enter item description" rows={3} />
            </Col>

            {/* Price */}
            <Col md={4}>
              <label className="form-label">
                Price ($) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                placeholder="0.00"
              />
              {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
            </Col>

            {/* Quantity */}
            <Col md={4}>
              <label className="form-label">Quantity</label>
              <input type="number" {...register('quantity', { valueAsNumber: true })} className="form-control" placeholder="1" />
            </Col>

            {/* Availability */}
            <Col md={4}>
              <label className="form-label d-block">Availability</label>
              <div className="form-check form-switch mt-2">
                <input type="checkbox" className="form-check-input" {...register('isAvailable')} id="isAvailable" />
                <label className="form-check-label" htmlFor="isAvailable">
                  Available
                </label>
              </div>
            </Col>

            {/* Nutrition */}
            <Col md={12}>
              <label className="form-label">Nutrition Facts</label>
              <input {...register('nutrition')} className="form-control" placeholder="e.g. 450 kcal, 30g protein…" />
            </Col>

            {/* Images */}
            <Col md={12}>
              <label className="form-label">Images (max 5)</label>
              <Controller
                control={control}
                name="images"
                render={({ field: { onChange, value, ...field } }) => (
                  <div>
                    <input {...field} type="file" accept="image/*" multiple onChange={(e) => onChange(e.target.files)} className="form-control" />
                    {previewImages.length > 0 && (
                      <div className="d-flex gap-2 flex-wrap mt-2">
                        {previewImages.map((img, i) => (
                          <Image
                            key={i}
                            src={getImageUrl(img)}
                            alt={`preview-${i}`}
                            width={80}
                            height={80}
                            style={{ objectFit: 'cover', borderRadius: 4 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
            </Col>

            {/* Choices */}
            <Col md={12}>
              <hr />
              <p className="fw-semibold mb-2">
                <IconifyIcon icon="solar:settings-bold" className="me-1" />
                Customization Choices (Optional)
              </p>
              {choiceGroups.map(({ label, key, fields, append, remove }) => (
                <div key={key} className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} onClick={() => toggleChoice(key)}>
                    <span className="fw-semibold">
                      {label}{' '}
                      {fields.length > 0 && (
                        <Badge bg="secondary" pill>
                          {fields.length}
                        </Badge>
                      )}
                    </span>
                    <IconifyIcon icon={openChoices[key] ? 'solar:alt-arrow-up-bold' : 'solar:alt-arrow-down-bold'} />
                  </div>
                  {openChoices[key] && (
                    <div className="mt-3">
                      {fields.map((field, index) => (
                        <Row key={field.id} className="g-2 mb-2 align-items-center">
                          <Col md={6}>
                            <input
                              {...register(`${key}.${index}.name` as any)}
                              className={`form-control form-control-sm ${(errors as any)?.[key]?.[index]?.name ? 'is-invalid' : ''}`}
                              placeholder="Option name"
                            />
                            {(errors as any)?.[key]?.[index]?.name && (
                              <div className="invalid-feedback">{(errors as any)[key][index].name.message}</div>
                            )}
                          </Col>
                          <Col md={4}>
                            <input
                              type="number"
                              step="0.01"
                              {...register(`${key}.${index}.price` as any, { valueAsNumber: true })}
                              className={`form-control form-control-sm ${(errors as any)?.[key]?.[index]?.price ? 'is-invalid' : ''}`}
                              placeholder="Price"
                            />
                            {(errors as any)?.[key]?.[index]?.price && (
                              <div className="invalid-feedback">{(errors as any)[key][index].price.message}</div>
                            )}
                          </Col>
                          <Col md={2}>
                            <button type="button" className="btn btn-soft-danger btn-sm w-100" onClick={() => remove(index)}>
                              <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" />
                            </button>
                          </Col>
                        </Row>
                      ))}
                      <button type="button" className="btn btn-outline-primary btn-sm mt-1" onClick={append}>
                        <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                        Add Option
                      </button>
                    </div>
                  )}
                </div>
              ))}
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
                {mode === 'add' ? 'Create Item' : 'Update Item'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

// ─────────────────────────────────────────────
// VIEW CATEGORY MODAL
// ─────────────────────────────────────────────

interface ViewCategoryModalProps {
  show: boolean
  onHide: () => void
  category: CategoryItem | null
}

const ViewCategoryModal: React.FC<ViewCategoryModalProps> = ({ show, onHide, category }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>
        <IconifyIcon icon="solar:document-bold" className="me-2" />
        Category Details
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {!category ? (
        <p className="text-muted text-center">Category not found</p>
      ) : (
        <Row className="g-3">
          {category.image && (
            <Col md={12}>
              <label className="form-label fw-semibold text-muted">Image</label>
              <div className="mt-1">
                <Image
                  src={getImageUrl(category.image)}
                  alt={category.title}
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover', borderRadius: 4 }}
                />
              </div>
            </Col>
          )}
          <Col md={12}>
            <label className="form-label fw-semibold text-muted">Title</label>
            <p className="mb-0">{category.title}</p>
          </Col>
          {category.description && (
            <Col md={12}>
              <label className="form-label fw-semibold text-muted">Description</label>
              <p className="mb-0">{category.description}</p>
            </Col>
          )}
          <Col md={6}>
            <label className="form-label fw-semibold text-muted">Status</label>
            <div>
              <Badge bg={category.isActive ? 'success' : 'danger'}>{category.isActive ? 'Active' : 'Inactive'}</Badge>
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

// ─────────────────────────────────────────────
// VIEW MENU ITEM MODAL
// ─────────────────────────────────────────────

interface ViewMenuItemModalProps {
  show: boolean
  onHide: () => void
  menuItem: MenuItemType | null
  categories: CategoryItem[]
}

const ViewMenuItemModal: React.FC<ViewMenuItemModalProps> = ({ show, onHide, menuItem, categories }) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>
        <IconifyIcon icon="solar:document-bold" className="me-2" />
        Menu Item Details
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {!menuItem ? (
        <p className="text-muted text-center">Item not found</p>
      ) : (
        <Row className="g-3">
          {menuItem.images && menuItem.images.length > 0 && (
            <Col md={12}>
              <label className="form-label fw-semibold text-muted">Images</label>
              <div className="d-flex gap-2 flex-wrap mt-1">
                {menuItem.images.map((img, i) => (
                  <Image key={i} src={getImageUrl(img)} alt={`img-${i}`} width={90} height={90} style={{ objectFit: 'cover', borderRadius: 4 }} />
                ))}
              </div>
            </Col>
          )}
          <Col md={6}>
            <label className="form-label fw-semibold text-muted">Title</label>
            <p className="mb-0">{menuItem.title}</p>
          </Col>
          <Col md={6}>
            <label className="form-label fw-semibold text-muted">Category</label>
            <p className="mb-0">{getCategoryTitle(menuItem.categoryId, categories)}</p>
          </Col>
          <Col md={12}>
            <label className="form-label fw-semibold text-muted">Description</label>
            <p className="mb-0">{menuItem.description}</p>
          </Col>
          <Col md={3}>
            <label className="form-label fw-semibold text-muted">Price</label>
            <p className="mb-0 fw-bold text-success">${menuItem.price.toFixed(2)}</p>
          </Col>
          <Col md={3}>
            <label className="form-label fw-semibold text-muted">Quantity</label>
            <p className="mb-0">{menuItem.quantity ?? 1}</p>
          </Col>
          <Col md={3}>
            <label className="form-label fw-semibold text-muted">Availability</label>
            <div>
              <Badge bg={menuItem.isAvailable ? 'success' : 'warning'}>{menuItem.isAvailable ? 'Available' : 'Unavailable'}</Badge>
            </div>
          </Col>
          <Col md={3}>
            <label className="form-label fw-semibold text-muted">Status</label>
            <div>
              <Badge bg={menuItem.isActive ? 'success' : 'danger'}>{menuItem.isActive ? 'Active' : 'Inactive'}</Badge>
            </div>
          </Col>
          {menuItem.nutritionFacts?.nutrition && (
            <Col md={12}>
              <label className="form-label fw-semibold text-muted">Nutrition Facts</label>
              <p className="mb-0">{menuItem.nutritionFacts.nutrition}</p>
            </Col>
          )}
          {menuItem.choices && Object.values(menuItem.choices).some((arr) => arr && arr.length > 0) && (
            <Col md={12}>
              <label className="form-label fw-semibold text-muted">Customization Choices</label>
              <Row className="g-2 mt-1">
                {(['choice1', 'choice2', 'choice3', 'choice4'] as const).map((key, i) => {
                  const opts = menuItem.choices?.[key]
                  if (!opts || opts.length === 0) return null
                  return (
                    <Col md={6} key={key}>
                      <p className="mb-1 fw-semibold small">Choice {i + 1}</p>
                      <ul className="mb-0 ps-3">
                        {opts.map((opt, j) => (
                          <li key={j} className="small">
                            {opt.name} {opt.price > 0 && <span className="text-muted">(+${opt.price.toFixed(2)})</span>}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          )}
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

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

const MenuManagement = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'menu-items'>('categories')

  // Category state
  const [catViewShow, setCatViewShow] = useState(false)
  const [catAddEditShow, setCatAddEditShow] = useState(false)
  const [catMode, setCatMode] = useState<'add' | 'edit'>('add')
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null)
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null)

  // Menu item state
  const [itemViewShow, setItemViewShow] = useState(false)
  const [itemAddEditShow, setItemAddEditShow] = useState(false)
  const [itemMode, setItemMode] = useState<'add' | 'edit'>('add')
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(null)
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null)

  // Queries
  const { data: catResponse, isLoading: catLoading, isFetching: catFetching, refetch: refetchCats } = useGetAllCategoriesQuery()
  const { data: itemResponse, isLoading: itemLoading, isFetching: itemFetching, refetch: refetchItems } = useGetAllMenuItemsQuery()

  const [deleteCategory, { isLoading: isDeletingCat }] = useDeleteCategoryMutation()
  const [deleteMenuItem, { isLoading: isDeletingItem }] = useDeleteMenuItemMutation()

  const categories = catResponse?.data || []
  const menuItems = itemResponse?.data || []

  // ── Category handlers ──
  const handleAddCategory = () => {
    setSelectedCategory(null)
    setCatMode('add')
    setCatAddEditShow(true)
  }

  const handleEditCategory = (cat: CategoryItem) => {
    setSelectedCategory(cat)
    setCatMode('edit')
    setCatAddEditShow(true)
  }

  const handleViewCategory = (cat: CategoryItem) => {
    setSelectedCategory(cat)
    setCatViewShow(true)
  }

  const handleDeleteCategory = async (cat: CategoryItem) => {
    const confirmed = await confirmDelete('Delete Category?', `Delete "${cat.title}"? This action cannot be undone.`)
    if (!confirmed) return
    try {
      setDeletingCatId(cat._id)
      await deleteCategory(cat._id).unwrap()
      toast.success('Category deleted successfully')
      refetchCats()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'Failed to delete category')
    } finally {
      setDeletingCatId(null)
    }
  }

  const handleCatSuccess = () => {
    refetchCats()
    setCatAddEditShow(false)
    setSelectedCategory(null)
  }

  // ── Menu item handlers ──
  const handleAddMenuItem = () => {
    setSelectedMenuItem(null)
    setItemMode('add')
    setItemAddEditShow(true)
  }

  const handleEditMenuItem = (item: MenuItemType) => {
    setSelectedMenuItem(item)
    setItemMode('edit')
    setItemAddEditShow(true)
  }

  const handleViewMenuItem = (item: MenuItemType) => {
    setSelectedMenuItem(item)
    setItemViewShow(true)
  }

  const handleDeleteMenuItem = async (item: MenuItemType) => {
    const confirmed = await confirmDelete('Delete Menu Item?', `Delete "${item.title}"? This action cannot be undone.`)
    if (!confirmed) return
    try {
      setDeletingItemId(item._id)
      await deleteMenuItem(item._id).unwrap()
      toast.success('Menu item deleted successfully')
      refetchItems()
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'Failed to delete menu item')
    } finally {
      setDeletingItemId(null)
    }
  }

  const handleItemSuccess = () => {
    refetchItems()
    setItemAddEditShow(false)
    setSelectedMenuItem(null)
  }

  // ── Category table ──
  const renderCategoriesTable = () => (
    <div className="table-responsive">
      <table className="table align-middle mb-0 table-hover table-centered">
        <thead className="bg-light-subtle">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {catLoading || catFetching ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading categories…</span>
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-muted">
                No categories found
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat._id}>
                <td>
                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                    <Image src={getImageUrl(cat.image)} alt={cat.title} width={60} height={60} style={{ objectFit: 'cover', borderRadius: 4 }} />
                  </div>
                </td>
                <td className="fw-semibold">{cat.title}</td>
                <td>
                  <span
                    className="text-muted"
                    style={{ maxWidth: 200, display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cat.description || '—'}
                  </span>
                </td>
                <td>
                  <span className={`fw-medium ${cat.isActive ? 'text-success' : 'text-danger'}`}>{cat.isActive ? 'Active' : 'Inactive'}</span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleViewCategory(cat)} className="btn btn-soft-info btn-sm" title="View">
                      <IconifyIcon icon="solar:eye-bold" className="align-middle fs-18" />
                    </button>
                    <button onClick={() => handleEditCategory(cat)} className="btn btn-soft-primary btn-sm" title="Edit">
                      <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="btn btn-soft-danger btn-sm"
                      disabled={isDeletingCat && deletingCatId === cat._id}
                      title="Delete">
                      {isDeletingCat && deletingCatId === cat._id ? (
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

  // ── Menu items table ──
  const renderMenuItemsTable = () => (
    <div className="table-responsive">
      <table className="table align-middle mb-0 table-hover table-centered">
        <thead className="bg-light-subtle">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {itemLoading || itemFetching ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading menu items…</span>
              </td>
            </tr>
          ) : menuItems.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-muted">
                No menu items found
              </td>
            </tr>
          ) : (
            menuItems.map((item: any) => (
              <tr key={item._id}>
                <td>
                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                    <Image
                      src={getImageUrl(item.images?.[0])}
                      alt={item.title}
                      width={60}
                      height={60}
                      style={{ objectFit: 'cover', borderRadius: 4 }}
                    />
                  </div>
                </td>
                <td className="fw-semibold">{item.title}</td>
                <td>{getCategoryTitle(item.categoryId, categories)}</td>
                <td className="text-success fw-semibold">${item.price.toFixed(2)}</td>
                <td>
                  <Badge bg={item.isAvailable ? 'success' : 'warning'}>{item.isAvailable ? 'Yes' : 'No'}</Badge>
                </td>
                <td>
                  <span className={`fw-medium ${item.isActive ? 'text-success' : 'text-danger'}`}>{item.isActive ? 'Active' : 'Inactive'}</span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button onClick={() => handleViewMenuItem(item)} className="btn btn-soft-info btn-sm" title="View">
                      <IconifyIcon icon="solar:eye-bold" className="align-middle fs-18" />
                    </button>
                    <button onClick={() => handleEditMenuItem(item)} className="btn btn-soft-primary btn-sm" title="Edit">
                      <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                    </button>
                    <button
                      onClick={() => handleDeleteMenuItem(item)}
                      className="btn btn-soft-danger btn-sm"
                      disabled={isDeletingItem && deletingItemId === item._id}
                      title="Delete">
                      {isDeletingItem && deletingItemId === item._id ? (
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
              <CardTitle as="h4" className="flex-grow-1">
                Menu Management
              </CardTitle>
            </CardHeader>

            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k as 'categories' | 'menu-items')}>
              <Nav variant="tabs" className="nav-bordered px-3">
                <Nav.Item>
                  <Nav.Link eventKey="categories">
                    <IconifyIcon icon="solar:tag-bold" className="me-1" />
                    Categories
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="menu-items">
                    <IconifyIcon icon="solar:dish-bold" className="me-1" />
                    Menu Items
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* ── CATEGORIES TAB ── */}
                <Tab.Pane eventKey="categories">
                  <div className="p-3">
                    <div className="d-flex justify-content-end mb-3">
                      <Button variant="primary" size="lg" onClick={handleAddCategory}>
                        <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                        Add Category
                      </Button>
                    </div>
                    {renderCategoriesTable()}
                  </div>
                </Tab.Pane>

                {/* ── MENU ITEMS TAB ── */}
                <Tab.Pane eventKey="menu-items">
                  <div className="p-3">
                    <div className="d-flex justify-content-end mb-3">
                      <Button variant="primary" size="lg" onClick={handleAddMenuItem}>
                        <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                        Add Menu Item
                      </Button>
                    </div>
                    {renderMenuItemsTable()}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card>
        </Col>
      </Row>

      {/* ── Category Modals ── */}
      <ViewCategoryModal show={catViewShow} onHide={() => setCatViewShow(false)} category={selectedCategory} />
      <CategoryModal
        show={catAddEditShow}
        onHide={() => setCatAddEditShow(false)}
        mode={catMode}
        category={selectedCategory}
        onSuccess={handleCatSuccess}
      />

      {/* ── Menu Item Modals ── */}
      <ViewMenuItemModal show={itemViewShow} onHide={() => setItemViewShow(false)} menuItem={selectedMenuItem} categories={categories} />
      <MenuItemModal
        show={itemAddEditShow}
        onHide={() => setItemAddEditShow(false)}
        mode={itemMode}
        menuItem={selectedMenuItem}
        categories={categories}
        onSuccess={handleItemSuccess}
      />
    </>
  )
}

export default MenuManagement
