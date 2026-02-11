import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId");

export const createCategoryZodSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Title is required"),
    description: z.string().optional(),
    image: z.string().url("Image must be valid URL").optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateCategoryZodSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const categoryIdParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

const choiceOptionSchema = z.object({
  name: z.string().min(1, "Choice name required"),
  price: z.number().min(0).optional(),
});

const nutritionSchema = z.object({
  nutrition: z.string().optional(),
});

export const createMenuItemZodSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Title required"),
    description: z.string().min(5, "Description required"),

    categoryId: objectIdSchema,

    choices: z.object({
      choice1: z.array(choiceOptionSchema).optional(),
      choice2: z.array(choiceOptionSchema).optional(),
      choice3: z.array(choiceOptionSchema).optional(),
      choice4: z.array(choiceOptionSchema).optional(),
    }),

    price: z.number().min(0, "Price must be positive"),
    quantity: z.number().min(0).optional(),

    nutritionFacts: nutritionSchema.optional(),

    images: z.array(z.string().url("Invalid image URL")).optional(),

    isAvailable: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateMenuItemZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    categoryId: objectIdSchema.optional(),

    choices: z
      .object({
        choice1: z.array(choiceOptionSchema).optional(),
        choice2: z.array(choiceOptionSchema).optional(),
        choice3: z.array(choiceOptionSchema).optional(),
        choice4: z.array(choiceOptionSchema).optional(),
      })
      .optional(),

    price: z.number().min(0).optional(),
    quantity: z.number().optional(),

    nutritionFacts: nutritionSchema.optional(),

    images: z.array(z.string().url()).optional(),

    isAvailable: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const menuItemIdParamSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});
