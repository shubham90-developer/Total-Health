import mongoose, { Schema } from "mongoose";
import { IBanner, IBannerDocument } from "./restoBannerInterface";

const bannerItemSchema = new Schema<IBanner>(
  {
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  { _id: true },
);

const bannerDocumentSchema = new Schema<IBannerDocument>(
  {
    banners: {
      type: [bannerItemSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Banner = mongoose.model<IBannerDocument>(
  "RestoBanner",
  bannerDocumentSchema,
);
