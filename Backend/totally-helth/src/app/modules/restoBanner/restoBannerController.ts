import { NextFunction, Request, Response } from "express";
import { Banner } from "./restoBannerModel";
import {
  addBannerValidation,
  updateBannerValidation,
} from "./restoBannerValidation";

import { appError } from "../../errors/appError";
import { cloudinary } from "../../config/cloudinary";

const getPublicId = (url: string): string | null => {
  // Match everything after /upload/ and before the file extension
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i);
  return match ? match[1] : null;
};

export const createBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;
  const imageFile = files?.file?.[0];

  try {
    if (!imageFile) {
      next(new appError("Banner image (field: file) is required", 400));
      return;
    }

    const payload = {
      image: imageFile.path, // Cloudinary URL set by multer-storage-cloudinary
      status: req.body.status === "inactive" ? "inactive" : "active",
    } as const;

    const validatedData = addBannerValidation.parse(payload);

    // Upsert: if no document exists create one, otherwise push into existing
    let doc = await Banner.findOne();
    if (!doc) {
      doc = new Banner({ banners: [validatedData] });
    } else {
      doc.banners.push(validatedData);
    }
    await doc.save();

    // Return the newly added banner item (last element)
    const newBanner = doc.banners[doc.banners.length - 1];

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Banner created successfully",
      data: newBanner,
    });
  } catch (error) {
    // Rollback uploaded image on any error
    if (imageFile?.path) {
      const publicId = getPublicId(imageFile.path);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    next(error);
  }
};

export const getAllBanners = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status } = req.query as { status?: string };

    // lean() returns plain JS objects — type as simple array, NOT DocumentArray
    type LeanBanner = {
      _id: unknown;
      image: string;
      status: "active" | "inactive";
    };
    type LeanDoc = { banners: LeanBanner[] };

    const doc = await Banner.findOne().lean<LeanDoc>();

    if (!doc || doc.banners.length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: "No banners found",
        data: [],
      });
      return;
    }

    // Plain array assignment — no DocumentArray mismatch
    let banners: LeanBanner[] = doc.banners;

    if (status === "active" || status === "inactive") {
      banners = banners.filter((b) => b.status === status);
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Banners retrieved successfully",
      data: banners,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBannerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;
  const imageFile = files?.file?.[0];

  try {
    const { id } = req.params;

    const doc = await Banner.findOne({ "banners._id": id });
    if (!doc) {
      next(new appError("Banner not found", 404));
      return;
    }

    const bannerItem = doc.banners.id(id);
    if (!bannerItem) {
      next(new appError("Banner not found", 404));
      return;
    }

    // Build update payload — only include provided fields
    const rawUpdate: Record<string, string> = {};
    if (req.body.status !== undefined) {
      rawUpdate.status = req.body.status === "inactive" ? "inactive" : "active";
    }
    if (imageFile) {
      rawUpdate.image = imageFile.path;
    }

    if (Object.keys(rawUpdate).length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: "No changes to update",
        data: bannerItem,
      });
      return;
    }

    const validatedData = updateBannerValidation.parse(rawUpdate);

    // If replacing the image, delete the old one from Cloudinary first
    if (validatedData.image && bannerItem.image) {
      const oldPublicId = getPublicId(bannerItem.image);
      if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
    }

    // Apply updates to the subdocument
    if (validatedData.image) bannerItem.image = validatedData.image;
    if (validatedData.status) bannerItem.status = validatedData.status;

    await doc.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Banner updated successfully",
      data: bannerItem,
    });
  } catch (error) {
    // Rollback newly uploaded image on error
    if (imageFile?.path) {
      const publicId = getPublicId(imageFile.path);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }
    next(error);
  }
};

export const deleteBannerById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const doc = await Banner.findOne({ "banners._id": id });
    if (!doc) {
      next(new appError("Banner not found", 404));
      return;
    }

    const bannerItem = doc.banners.id(id);
    if (!bannerItem) {
      next(new appError("Banner not found", 404));
      return;
    }

    // Delete image from Cloudinary
    if (bannerItem.image) {
      const publicId = getPublicId(bannerItem.image);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    // Remove subdocument
    bannerItem.deleteOne();
    await doc.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Banner deleted successfully",
      data: bannerItem,
    });
  } catch (error) {
    next(error);
  }
};
