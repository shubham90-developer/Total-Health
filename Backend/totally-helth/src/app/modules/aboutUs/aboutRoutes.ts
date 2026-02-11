// routes/aboutUs.routes.ts

import { Router } from "express";
import { getAboutUs, updateAboutUs } from "./aboutController";

import { upload } from "../../config/cloudinary";

const router = Router();

// GET /api/about-us - Get About Us data
router.get("/", getAboutUs);

// PUT /api/about-us - Update About Us data with multiple file uploads
router.put(
  "/",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "founderImage", maxCount: 1 },
    { name: "isoCertificate", maxCount: 1 },
    { name: "infoBanner1", maxCount: 1 },
    { name: "infoBanner2", maxCount: 1 },
    { name: "infoBanner3", maxCount: 1 },
    // NEW
    { name: "additionalImage1", maxCount: 1 },
    { name: "additionalImage2", maxCount: 1 },
    { name: "additionalImage3", maxCount: 1 },
  ]),
  updateAboutUs,
);

export const aboutUsRouter = router;
