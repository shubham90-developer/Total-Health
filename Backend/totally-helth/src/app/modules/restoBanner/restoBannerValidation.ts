import { z } from "zod";

// Single banner item validation
export const bannerItemValidation = z.object({
  image: z.string().min(1, "Image URL is required"),
  status: z.enum(["active", "inactive"]).default("active"),
});

// Validation for creating the entire banner document
// (used when no document exists yet — creates the doc with initial banners array)
export const createBannerDocumentValidation = z.object({
  banners: z
    .array(bannerItemValidation)
    .min(1, "At least one banner is required"),
});

// Validation for adding a new banner item to the existing document
export const addBannerValidation = z.object({
  image: z.string().min(1, "Image URL is required"),
  status: z.enum(["active", "inactive"]).default("active"),
});

// Validation for updating a specific banner item inside the document
export const updateBannerValidation = z.object({
  image: z.string().min(1, "Image URL is required").optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

export type TAddBanner = z.infer<typeof addBannerValidation>;
export type TUpdateBanner = z.infer<typeof updateBannerValidation>;
