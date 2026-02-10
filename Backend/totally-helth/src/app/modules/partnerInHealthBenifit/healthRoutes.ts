// health.routes.ts
import { Router } from "express";
import {
  getHealth,
  updatePartnerBenefitsSection,
  updateWhyPartnerSection,
  createCompanyBenefit,
  getAllCompanyBenefits,
  updateCompanyBenefit,
  deleteCompanyBenefit,
  createEmployeeBenefit,
  getAllEmployeeBenefits,
  getEmployeeBenefitById,
  updateEmployeeBenefit,
  deleteEmployeeBenefit,
} from "./healthController";

import { upload } from "../../config/cloudinary";

const router = Router();

router.get("/", getHealth);

router.put(
  "/partner-benefits",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updatePartnerBenefitsSection,
);

router.put("/why-partner", updateWhyPartnerSection);

router.post(
  "/company-benefits",
  upload.fields([{ name: "icon", maxCount: 1 }]),
  createCompanyBenefit,
);

router.get("/company-benefits", getAllCompanyBenefits);

router.put(
  "/company-benefits/:benefitId",
  upload.fields([{ name: "icon", maxCount: 1 }]),
  updateCompanyBenefit,
);

router.delete("/company-benefits/:benefitId", deleteCompanyBenefit);

router.post(
  "/employee-benefits",
  upload.fields([{ name: "icon", maxCount: 1 }]),
  createEmployeeBenefit,
);

router.get("/employee-benefits", getAllEmployeeBenefits);

router.get("/employee-benefits/:benefitId", getEmployeeBenefitById);

router.put(
  "/employee-benefits/:benefitId",
  upload.fields([{ name: "icon", maxCount: 1 }]),
  updateEmployeeBenefit,
);

router.delete("/employee-benefits/:benefitId", deleteEmployeeBenefit);

export const partnerInHealthRouter = router;
