'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Card, CardFooter, CardHeader, CardTitle, Col, Row, Spinner, Alert } from 'react-bootstrap'
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from '@/services/blogsApi'

import type { Category } from '@/services/blogsApi'
import { toast } from 'react-hot-toast'

const CategoryList = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // RTK Query hooks
  const { data: categories = [], isLoading, isError, error } = useGetAllCategoriesQuery()
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()

  // Handle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories(categories.map((cat) => cat._id))
    } else {
      setSelectedCategories([])
    }
  }

  // Handle individual checkbox
  const handleCheckbox = (id: string) => {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]))
  }

  // Handle delete
  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all associated blogs.`)) {
      try {
        await deleteCategory(id).unwrap()
        toast.success('Category deleted successfully')
      } catch (err: any) {
        toast.error(err?.data?.message || 'Failed to delete category')
      }
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(categories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCategories = categories.slice(startIndex, endIndex)

  // Loading state
  if (isLoading) {
    return (
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Blog Category</CardTitle>
            </CardHeader>
            <div className="p-5 text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </Card>
        </Col>
      </Row>
    )
  }

  // Error state
  if (isError) {
    return (
      <Row>
        <Col xl={12}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Blog Category</CardTitle>
            </CardHeader>
            <div className="p-4">
              <Alert variant="danger">Failed to load categories. Please try again later.</Alert>
            </div>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center gap-1">
            <CardTitle as={'h4'} className="flex-grow-1">
              Blog Category
            </CardTitle>
            <Link href="/blog/blog-category-add" className="btn btn-lg btn-primary">
              Add Category
            </Link>
          </CardHeader>
          <div>
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th style={{ width: 20 }}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheck1"
                          checked={selectedCategories.length === categories.length && categories.length > 0}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label" htmlFor="customCheck1" />
                      </div>
                    </th>
                    <th>Category Name</th>
                    <th>Slug</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No categories found. Create one to get started.
                      </td>
                    </tr>
                  ) : (
                    currentCategories.map((item: any) => (
                      <tr key={item._id}>
                        <td>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`customCheck${item._id}`}
                              checked={selectedCategories.includes(item._id)}
                              onChange={() => handleCheckbox(item._id)}
                            />
                            <label className="form-check-label" htmlFor={`customCheck${item._id}`} />
                          </div>
                        </td>
                        <td className="fw-medium">{item.name}</td>
                        <td className="text-muted">{item.slug}</td>
                        <td className="text-muted">
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link href={`/blog/blog-category-edit/${item._id}`} className="btn btn-soft-primary btn-sm">
                              <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </Link>
                            <button onClick={() => handleDelete(item._id, item.name)} className="btn btn-soft-danger btn-sm" disabled={isDeleting}>
                              <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
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
          {totalPages > 1 && (
            <CardFooter className="border-top">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}>
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
  )
}

export default CategoryList
