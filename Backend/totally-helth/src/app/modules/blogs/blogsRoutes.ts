// routes/blog.routes.ts
import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getWholeDocument,
  createBlog,
  updateBlog,
  deleteBlog,
} from './blogsController';

import { upload } from '../../config/cloudinary';

const router = express.Router();

// ✅ SPECIFIC ROUTES FIRST - Categories (exact paths)
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);

// ✅ SPECIFIC ROUTES - Blogs (exact paths)
router.get('/blogs', getWholeDocument);
router.post(
  '/blogs',
  upload.fields([{ name: 'hero', maxCount: 1 }]),
  createBlog,
);

// ✅ DYNAMIC ROUTES LAST - Category with ID
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// ✅ DYNAMIC ROUTES LAST - Blog with ID
router.put(
  '/blogs/:id',
  upload.fields([{ name: 'hero', maxCount: 1 }]),
  updateBlog,
);
router.delete('/blogs/:id', deleteBlog);

export const blogsRouter = router;
