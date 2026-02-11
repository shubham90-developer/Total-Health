import { Document, Types } from "mongoose";

// ================= CATEGORY =================
export interface ICategory extends Document {
  title: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ================= CHOICE OBJECT =================
export interface IChoiceOption {
  name: string;
  price?: number;
}

// ================= 4 FIXED CHOICE GROUPS =================
export interface IChoices {
  choice1: IChoiceOption[]; // Bowl options
  choice2: IChoiceOption[]; // Side options
  choice3: IChoiceOption[]; // Dessert options
  choice4: IChoiceOption[]; // Drink options
}

// ================= NUTRITION =================
export interface INutritionFacts {
  nutrition: string;
}

// ================= MENU ITEM =================
export interface IMenuItem extends Document {
  title: string;
  description: string;
  categoryId: Types.ObjectId;

  choices: IChoices;

  price: number;
  quantity: number;

  nutritionFacts: INutritionFacts;
  images: string[];

  isAvailable: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
