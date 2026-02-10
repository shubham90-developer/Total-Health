// models/AboutUs.model.ts

import mongoose, { Schema, Model } from "mongoose";
import { IAboutUs } from "./aboutInterface";

const AboutUsSchema = new Schema<IAboutUs>(
  {
    // General Information
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      required: [true, "Subtitle is required"],
      trim: true,
    },
    banner: {
      type: String,
      required: [true, "Banner is required"],
    },
    infoTitle1: {
      type: String,
      trim: true,
    },
    infoSubtitle1: {
      type: String,
      trim: true,
    },
    infoTitle2: {
      type: String,
      trim: true,
    },
    infoSubtitle2: {
      type: String,
      trim: true,
    },
    aboutDescription: {
      type: String,
      required: [true, "Description is required"],
    },

    // Founder Information
    founderTitle: {
      type: String,
      trim: true,
    },
    founderImage: {
      type: String,
    },
    founderName: {
      type: String,
      trim: true,
    },
    founderDesignation: {
      type: String,
      trim: true,
    },
    founderDescription: {
      type: String,
    },

    // About Information
    aboutInfoTitle: {
      type: String,
      trim: true,
    },
    aboutInfoSubtitle: {
      type: String,
      trim: true,
    },
    isoCertificate: {
      type: String,
    },
    infoBanner1: {
      type: String,
    },
    infoBanner2: {
      type: String,
    },
    infoBanner3: {
      type: String,
    },
    aboutInfoDescription: {
      type: String,
    },

    // Meta Options
    metaTitle: {
      type: String,
      required: [true, "Meta title is required"],
      trim: true,
    },
    metaKeyword: {
      type: String,
      required: [true, "Meta keyword is required"],
      trim: true,
    },
    metaDescription: {
      type: String,
      required: [true, "Meta description is required"],
    },
    additionalInfo: {
      title: { type: String, trim: true },
      subtitle: { type: String, trim: true },
      description: { type: String },
      images: {
        type: [String],
        validate: {
          validator: function (v: string[]) {
            return v.length <= 3;
          },
          message: "Maximum 3 images allowed",
        },
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AboutUs: Model<IAboutUs> = mongoose.model<IAboutUs>(
  "AboutUs",
  AboutUsSchema,
);
