// health.validation.ts
import { z } from "zod";

export const healthUpdateValidation = z.object({
  // Partner in Health Benefits
  "PartnerinHealthBenefits.title": z.string().optional(),
  "PartnerinHealthBenefits.subTitle": z.string().optional(),
  "PartnerinHealthBenefits.image": z.string().optional(),

  // Benefit for Companies
  "BenefitForCompanies.title": z.string().optional(),
  "BenefitForCompanies.subtitle": z.string().optional(),
  "BenefitForCompanies.benefits": z
    .array(
      z.object({
        _id: z.string().optional(),
        icon: z.string(),
        text: z.string(),
        status: z.enum(["active", "inactive"]).default("active"),
      }),
    )
    .optional(),

  // Benefit for Employees
  "BenefitForEmployees.title": z.string().optional(),
  "BenefitForEmployees.subtitle": z.string().optional(),
  "BenefitForEmployees.benefits": z
    .array(
      z.object({
        _id: z.string().optional(),
        icon: z.string(),
        text: z.string(),
        status: z.enum(["active", "inactive"]).default("active"),
      }),
    )
    .optional(),

  // Why Partner
  "whyPartner.title": z.string().optional(),
  "whyPartner.description": z.string().optional(),
  "whyPartner.video": z.string().optional(),

  isActive: z.boolean().optional(),
});

export const createCompanyBenefitValidation = z.object({
  text: z.string().min(1, "Text is required"),
  status: z.enum(["active", "inactive"]).default("active"),
});

export const createEmployeeBenefitValidation = z.object({
  text: z.string().min(1, "Text is required"),
  status: z.enum(["active", "inactive"]).default("active"),
});

export const updateBenefitValidation = z.object({
  text: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
