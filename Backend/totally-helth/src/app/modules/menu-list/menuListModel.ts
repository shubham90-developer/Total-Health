import { Schema, model } from "mongoose";
import { ICategory, IMenuItem } from "./menuListInterface";

const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    image: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Category = model<ICategory>("MenuItemCategory", CategorySchema);

const ChoiceOptionSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
  },
  { _id: true },
);

const MenuItemSchema = new Schema<IMenuItem>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "MenuItemCategory",
      required: true,
    },

    choices: {
      choice1: { type: [ChoiceOptionSchema], default: [] },
      choice2: { type: [ChoiceOptionSchema], default: [] },
      choice3: { type: [ChoiceOptionSchema], default: [] },
      choice4: { type: [ChoiceOptionSchema], default: [] },
    },

    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },

    nutritionFacts: {
      nutrition: String,
    },

    images: { type: [String], default: [] },

    isAvailable: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const MenuItem = model<IMenuItem>("MenuItem", MenuItemSchema);
