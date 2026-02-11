import { Document, Types } from "mongoose";

export interface IBanner {
  _id: Types.ObjectId;
  image: string;
  status: "active" | "inactive";
}

export interface IBannerDocument extends Document {
  banners: Types.DocumentArray<IBanner & Document>;
  createdAt?: Date;
  updatedAt?: Date;
}
