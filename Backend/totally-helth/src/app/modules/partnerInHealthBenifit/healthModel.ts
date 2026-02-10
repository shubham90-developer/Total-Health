// health.model.ts
import mongoose, { Schema } from "mongoose";
import { IHealth } from "./healthInterface";

// Sub-schema for benefits (reusable)
const benefitItemSchema = new Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
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
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: true },
);

// Sub-schema for Benefit sections (Companies/Employees)
const benefitSectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    benefits: {
      type: [benefitItemSchema],
      required: true,
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
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
  },
  { _id: true },
);

// Main schema
const healthSchema = new Schema<IHealth>(
  {
    PartnerinHealthBenefits: {
      type: partnerBenefitsSchema,
      required: true,
    },
    BenefitForCompanies: {
      type: benefitSectionSchema,
      required: true,
    },
    BenefitForEmployees: {
      type: benefitSectionSchema,
      required: true,
    },
    whyPartner: {
      type: whyPartnerSchema,
      required: true,
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
