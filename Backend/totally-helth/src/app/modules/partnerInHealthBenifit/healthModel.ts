// health.model.ts
import mongoose, { Schema } from "mongoose";
import { IHealth } from "./healthInterface";

// Sub-schema for benefits (reusable)
const benefitItemSchema = new Schema(
  {
    icon: {
      type: String,
    },
    text: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { _id: true },
);

// Sub-schema for Partner in Health Benefits
const partnerBenefitsSchema = new Schema(
  {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { _id: true },
);

// Sub-schema for Benefit sections (Companies/Employees)
const benefitSectionSchema = new Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    benefits: {
      type: [benefitItemSchema],

      default: [],
    },
  },
  { _id: true },
);

// Sub-schema for Why Partner
const whyPartnerSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { _id: true },
);

// Main schema
const healthSchema = new Schema<IHealth>(
  {
    PartnerinHealthBenefits: {
      type: partnerBenefitsSchema,
    },
    BenefitForCompanies: {
      type: benefitSectionSchema,
    },
    BenefitForEmployees: {
      type: benefitSectionSchema,
    },
    whyPartner: {
      type: whyPartnerSchema,
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

export const Health = mongoose.model<IHealth>("Health", healthSchema);
