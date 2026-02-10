// validations/aboutUs.validation.ts

import { z } from "zod";

export const aboutUsValidation = z.object({
  // General Information
  title: z.string().min(1, "Title is required").trim(),
  subtitle: z.string().min(1, "Subtitle is required").trim(),
  banner: z.string().url("Invalid banner URL"),
  infoTitle1: z.string().trim().optional(),
  infoSubtitle1: z.string().trim().optional(),
  infoTitle2: z.string().trim().optional(),
  infoSubtitle2: z.string().trim().optional(),
  aboutDescription: z.string().min(1, "Description is required"),

  // Founder Information
  founderTitle: z.string().trim().optional(),
  founderImage: z.string().url("Invalid image URL").optional(),
  founderName: z.string().trim().optional(),
  founderDesignation: z.string().trim().optional(),
  founderDescription: z.string().optional(),

  // About Information
  aboutInfoTitle: z.string().trim().optional(),
  aboutInfoSubtitle: z.string().trim().optional(),
  isoCertificate: z.string().url("Invalid certificate URL").optional(),
  infoBanner1: z.string().url("Invalid banner URL").optional(),
  infoBanner2: z.string().url("Invalid banner URL").optional(),
  infoBanner3: z.string().url("Invalid banner URL").optional(),
  aboutInfoDescription: z.string().optional(),

  // Meta Options
  metaTitle: z.string().min(1, "Meta title is required").trim(),
  metaKeyword: z.string().min(1, "Meta keyword is required").trim(),
  metaDescription: z.string().min(1, "Meta description is required"),

  isActive: z.boolean().optional().default(true),
});

export const aboutUsUpdateValidation = z.object({
  // General Information
  title: z.string().min(1, "Title is required").trim().optional(),
  subtitle: z.string().min(1, "Subtitle is required").trim().optional(),
  banner: z.string().url("Invalid banner URL").optional(),
  infoTitle1: z.string().trim().optional(),
  infoSubtitle1: z.string().trim().optional(),
  infoTitle2: z.string().trim().optional(),
  infoSubtitle2: z.string().trim().optional(),
  aboutDescription: z.string().min(1, "Description is required").optional(),

  // Founder Information
  founderTitle: z.string().trim().optional(),
  founderImage: z.string().url("Invalid image URL").optional(),
  founderName: z.string().trim().optional(),
  founderDesignation: z.string().trim().optional(),
  founderDescription: z.string().optional(),

  // About Information
  aboutInfoTitle: z.string().trim().optional(),
  aboutInfoSubtitle: z.string().trim().optional(),
  isoCertificate: z.string().url("Invalid certificate URL").optional(),
  infoBanner1: z.string().url("Invalid banner URL").optional(),
  infoBanner2: z.string().url("Invalid banner URL").optional(),
  infoBanner3: z.string().url("Invalid banner URL").optional(),
  aboutInfoDescription: z.string().optional(),

  // Meta Options
  metaTitle: z.string().min(1, "Meta title is required").trim().optional(),
  metaKeyword: z.string().min(1, "Meta keyword is required").trim().optional(),
  metaDescription: z.string().min(1, "Meta description is required").optional(),

  additionalInfo: z
    .object({
      title: z.string().trim().optional(),
      subtitle: z.string().trim().optional(),
      description: z.string().optional(),
      images: z.array(z.string().url()).max(3).optional(),
    })
    .optional(),
  isActive: z.boolean().optional(),
});

// Type exports
export type AboutUsInput = z.infer<typeof aboutUsValidation>;
export type AboutUsUpdateInput = z.infer<typeof aboutUsUpdateValidation>;
