'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Card, CardFooter, CardHeader, CardTitle, Badge, Spinner, Alert } from 'react-bootstrap'
import { useGetAllBlogsQuery, useDeleteBlogMutation } from '@/services/blogsApi'
import type { BlogPost, Category } from '@/services/blogsApi'
import { toast } from 'react-hot-toast'

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // RTK Query hooks
  const { data: blogs = [], isLoading, isError } = useGetAllBlogsQuery()
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation()

  // Handle delete
  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteBlog(id).unwrap()
        toast.success('Blog deleted successfully')
      } catch (err: any) {
        toast.error(err?.data?.message || 'Failed to delete blog')
      }
    }
  }

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'success'
      case 'draft':
        return 'warning'
      case 'archived':
        return 'secondary'
      default:
        return 'primary'
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(blogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBlogs = blogs.slice(startIndex, endIndex)

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>All Blog List</CardTitle>
        </CardHeader>
        <div className="p-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Card>
    )
  }

  // Error state
  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>All Blog List</CardTitle>
        </CardHeader>
        <div className="p-4">
          <Alert variant="danger">Failed to load blogs. Please try again later.</Alert>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-center gap-1">
        <CardTitle as={'h4'} className="flex-grow-1">
          All Blog List
        </CardTitle>
        <Link href="/blog/add-blog" className="btn btn-lg btn-primary">
          Add Blog
        </Link>
      </CardHeader>
      <div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover table-centered">
            <thead className="bg-light-subtle">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No blogs found. Create one to get started.
                  </td>
                </tr>
              ) : (
                currentBlogs.map((blog: any) => {
                  const category = blog.category as Category
                  return (
                    <tr key={blog._id}>
                      <td>
                        <Image
                          src={blog.hero || '/images/blog/blog-1.jpg'}
                          alt={blog.title}
                          width={60}
                          height={60}
                          className="rounded"
                          style={{ objectFit: 'cover' }}
                        />
                      </td>
                      <td>
                        <div className="fw-medium" style={{ maxWidth: '300px' }}>
                          {blog.title}
                        </div>
                        <small className="text-muted">{blog.readTime} read</small>
                      </td>
                      <td>
                        <Badge bg="primary" className="text-white">
                          {category?.name || 'N/A'}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1" style={{ maxWidth: '200px' }}>
                          {blog.tags.slice(0, 3).map((tag: any, idx: any) => (
                            <Badge key={idx} bg="light" text="dark" className="border">
                              {tag}
                            </Badge>
                          ))}
                          {blog.tags.length > 3 && (
                            <Badge bg="light" text="dark" className="border">
                              +{blog.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>
                        <Badge bg={getStatusVariant(blog.status)} className="text-capitalize">
                          {blog.status}
                        </Badge>
                      </td>
                      <td className="text-muted">
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link href={`/blog/blog-edit/${blog._id}`} className="btn btn-soft-primary btn-sm">
                            <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                          </Link>
                          <button onClick={() => handleDelete(blog._id, blog.title)} className="btn btn-soft-danger btn-sm" disabled={isDeleting}>
                            <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
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
  )
}

export default BlogList
