import { Document } from "mongoose";

export interface IContract extends Document {
  name: string;
  subject: string;

  emailAddress: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
