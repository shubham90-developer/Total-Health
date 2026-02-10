// healthInterface.ts
import { Document } from "mongoose";

export interface IHealth extends Document {
  // Partner in Health Benefits Section
  PartnerinHealthBenefits: {
    title: string;
    subTitle: string;
    image: string;
  };

  // Benefit for Companies
  BenefitForCompanies: {
    title: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      text: string;
      status: "active" | "inactive";
    }>;
  };

  // Benefit for Employees
  BenefitForEmployees: {
    title: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      text: string;
      status: "active" | "inactive";
    }>;
  };

  // Why Partner Section
  whyPartner: {
    title: string;
    description: string;
    video: string;
  };

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
