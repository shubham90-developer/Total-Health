// services.routes.ts
import { Router } from "express";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "./servicesController";

import { upload } from "../../config/cloudinary";

const router = Router();

router.get("/", getAllServices);

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createService,
);

router.put(
  "/:serviceId",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateService,
);

router.delete("/:serviceId", deleteService);

export const servicesRouter = router;
