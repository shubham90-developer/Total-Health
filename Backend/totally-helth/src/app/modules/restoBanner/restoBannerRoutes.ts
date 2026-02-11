import { Router } from "express";
import { upload } from "../../config/cloudinary";
import {
  createBanner,
  getAllBanners,
  updateBannerById,
  deleteBannerById,
} from "./restoBannerController";

const router = Router();

router.post("/", upload.fields([{ name: "file", maxCount: 1 }]), createBanner);
router.get("/", getAllBanners);
router.patch(
  "/:id",
  upload.fields([{ name: "file", maxCount: 1 }]),
  updateBannerById,
);
router.delete("/:id", deleteBannerById);

export const restoBannerRouter = router;
