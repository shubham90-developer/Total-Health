import { NextFunction, Request, Response } from "express";
import { Category, MenuItem } from "./menuListModel";

import {
  createCategoryZodSchema,
  updateCategoryZodSchema,
  createMenuItemZodSchema,
  updateMenuItemZodSchema,
} from "./menuListValidation";

import { appError } from "../../errors/appError";
import { cloudinary } from "../../config/cloudinary";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = (req.files as any)?.image?.[0];

    const payload = {
      ...req.body,
      image: file?.path,
    };

    const validatedData = createCategoryZodSchema.parse({ body: payload }).body;

    const category = await Category.create(validatedData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    const file = (req.files as any)?.image?.[0];
    if (file?.path) {
      const publicId = file.path.split("/").pop()?.split(".")[0];
      if (publicId)
        await cloudinary.uploader.destroy(`menu-categories/${publicId}`);
    }
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await Category.find();

    res.json({
      success: true,
      statusCode: 200,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new appError("Category not found", 404));

    const file = (req.files as any)?.image?.[0];

    const payload = {
      ...req.body,
      ...(file && { image: file.path }),
    };

    const validatedData = updateCategoryZodSchema.parse({ body: payload }).body;

    if (file && category.image) {
      const publicId = category.image.split("/").pop()?.split(".")[0];
      if (publicId)
        await cloudinary.uploader.destroy(`menu-categories/${publicId}`);
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleted = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );

    if (!deleted) return next(new appError("Category not found", 404));

    res.json({
      success: true,
      statusCode: 200,
      message: "Category deleted successfully",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = JSON.parse(JSON.stringify(req.body), (key, value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      if (value !== "" && !isNaN(value)) return Number(value);
      return value;
    });

    const files = (req.files as any)?.images || [];

    const payload = {
      ...body,
      images: files.map((f: any) => f.path),
    };

    const validatedData = createMenuItemZodSchema.parse({ body: payload }).body;

    const menuItem = await MenuItem.create(validatedData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Menu item created successfully",
      data: menuItem,
    });
  } catch (error) {
    const files = (req.files as any)?.images || [];
    for (const f of files) {
      const publicId = f.path.split("/").pop()?.split(".")[0];
      if (publicId) await cloudinary.uploader.destroy(`menu-items/${publicId}`);
    }
    next(error);
  }
};

export const getAllMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const items = await MenuItem.find({ isActive: true }).populate(
      "categoryId",
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Menu items fetched successfully",
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return next(new appError("Menu item not found", 404));
    const body = JSON.parse(JSON.stringify(req.body), (key, value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      if (value !== "" && !isNaN(value)) return Number(value);
      return value;
    });

    const files = (req.files as any)?.images || [];
    const payload = {
      ...body,
      ...(files.length > 0 && { images: files.map((f: any) => f.path) }),
    };

    const validatedData = updateMenuItemZodSchema.parse({ body: payload }).body;

    if (files.length > 0 && menuItem.images?.length) {
      for (const img of menuItem.images) {
        const publicId = img.split("/").pop()?.split(".")[0];
        if (publicId)
          await cloudinary.uploader.destroy(`menu-items/${publicId}`);
      }
    }

    const updated = await MenuItem.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Menu item updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleted = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );

    if (!deleted) return next(new appError("Menu item not found", 404));

    res.json({
      success: true,
      statusCode: 200,
      message: "Menu item deleted successfully",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
