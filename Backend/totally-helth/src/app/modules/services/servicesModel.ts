// sectionModel.ts
import mongoose, { Schema } from "mongoose";
import { IServices, IServicesDocument } from "./servicesInterface";
const servicesItemSchema = new Schema<IServices>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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

const servicesDocumentSchema = new Schema<IServicesDocument>(
  {
    sections: {
      type: [servicesItemSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Service = mongoose.model<IServicesDocument>(
  "Services",
  servicesDocumentSchema,
);
