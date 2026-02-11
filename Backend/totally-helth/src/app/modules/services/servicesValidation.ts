// services.validation.ts
import { z } from "zod";

export const createServiceValidation = z.object({
  title: z.string("Title is required").min(1, "Title cannot be empty").trim(),
  description: z
    .string("Description is required")
    .min(1, "Description cannot be empty")
    .trim(),
});

export const updateServiceValidation = z.object({
  title: z.string().min(1, "Title cannot be empty").trim().optional(),
  description: z
    .string()
    .min(1, "Description cannot be empty")
    .trim()
    .optional(),
});
