import { Router } from "express";

import { upload } from "../../config/cloudinary"; // your multer config
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  createMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "./menuListController";

const router = Router();

router.post(
  "/categories",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createCategory,
);

// Get All Categories
router.get("/categories", getAllCategories);

// Update Category
router.patch(
  "/categories/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateCategory,
);

// Delete Category (soft delete)
router.delete("/categories/:id", deleteCategory);

router.post(
  "/menu-items",
  upload.fields([{ name: "images", maxCount: 5 }]),
  createMenuItem,
);

// Get All Menu Items
router.get("/menu-items", getAllMenuItems);

// Update Menu Item
router.patch(
  "/menu-items/:id",
  upload.fields([{ name: "images", maxCount: 5 }]),
  updateMenuItem,
);

// Delete Menu Item
router.delete("/menu-items/:id", deleteMenuItem);

export const menuItemsRouter = router;
