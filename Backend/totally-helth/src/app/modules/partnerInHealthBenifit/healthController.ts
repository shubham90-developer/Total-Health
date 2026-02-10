// health.controller.ts
import { NextFunction, Request, Response } from "express";

import { Health } from "./healthModel";
import {
  createCompanyBenefitValidation,
  createEmployeeBenefitValidation,
  updateBenefitValidation,
} from "./healthValidation";

import { appError } from "../../errors/appError";
import { cloudinary } from "../../config/cloudinary";

// ==================== GET HEALTH ====================
export const getHealth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let health = await Health.findOne();

    // If no document exists, create an empty one
    if (!health) {
      health = new Health({
        PartnerinHealthBenefits: {
          title: "",
          subTitle: "",
          image: "",
        },
        BenefitForCompanies: {
          title: "",
          subtitle: "",
          benefits: [],
        },
        BenefitForEmployees: {
          title: "",
          subtitle: "",
          benefits: [],
        },
        whyPartner: {
          title: "",
          description: "",
          video: "",
        },
        isActive: true,
      });
      await health.save();
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Health data retrieved successfully",
      data: health,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// ==================== UPDATE PARTNER IN HEALTH BENEFITS SECTION ====================
export const updatePartnerBenefitsSection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, subTitle } = req.body;

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    // Handle image upload
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const imageFile = files?.image?.[0];

    // Update fields
    if (title !== undefined) {
      health.PartnerinHealthBenefits.title = title;
    }

    if (subTitle !== undefined) {
      health.PartnerinHealthBenefits.subTitle = subTitle;
    }

    if (imageFile) {
      // Delete old image
      if (health.PartnerinHealthBenefits.image) {
        const publicId = health.PartnerinHealthBenefits.image
          .split("/")
          .pop()
          ?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`health/${publicId}`);
        }
      }
      health.PartnerinHealthBenefits.image = imageFile.path;
    }

    await health.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Partner Benefits section updated successfully",
      data: health.PartnerinHealthBenefits,
    });
    return;
  } catch (error) {
    // Delete uploaded image if error occurs
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const imagePath = files?.image?.[0]?.path;

    if (imagePath) {
      const publicId = imagePath.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`health/${publicId}`);
      }
    }

    next(error);
  }
};

// ==================== UPDATE WHY PARTNER SECTION ====================
export const updateWhyPartnerSection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, video } = req.body;

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    // Update fields
    if (title !== undefined) {
      health.whyPartner.title = title;
    }

    if (description !== undefined) {
      health.whyPartner.description = description;
    }

    if (video !== undefined) {
      health.whyPartner.video = video;
    }

    await health.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Why Partner section updated successfully",
      data: health.whyPartner,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// ==================== CREATE COMPANY BENEFIT ====================
export const createCompanyBenefit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, status = "active" } = req.body;

    // Validate input
    const validatedData = createCompanyBenefitValidation.parse({
      text,
      status,
    });

    // Handle icon upload
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const iconFile = files?.icon?.[0];

    if (!iconFile) {
      next(new appError("Icon image is required", 400));
      return;
    }

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    // Create new benefit with uploaded icon
    const newBenefit = {
      icon: iconFile.path,
      text: validatedData.text,
      status: validatedData.status,
    };

    health.BenefitForCompanies.benefits.push(newBenefit);
    await health.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Company benefit created successfully",
      data: health.BenefitForCompanies.benefits[
        health.BenefitForCompanies.benefits.length - 1
      ],
    });
    return;
  } catch (error) {
    // Delete uploaded icon if error occurs
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const iconPath = files?.icon?.[0]?.path;

    if (iconPath) {
      const publicId = iconPath.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`health/${publicId}`);
      }
    }

    next(error);
  }
};

// ==================== GET ALL COMPANY BENEFITS ====================
export const getAllCompanyBenefits = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const health = await Health.findOne();

    if (!health) {
      res.json({
        success: true,
        statusCode: 200,
        message: "No benefits found",
        data: {
          title: "",
          subtitle: "",
          benefits: [],
        },
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Company benefits retrieved successfully",
      data: health.BenefitForCompanies,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// ==================== UPDATE COMPANY BENEFIT ====================
export const updateCompanyBenefit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { benefitId } = req.params;
    const { text, status } = req.body;

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    const benefit = health.BenefitForCompanies.benefits.find(
      (b: any) => b._id.toString() === benefitId,
    );

    if (!benefit) {
      next(new appError("Benefit not found", 404));
      return;
    }

    // Handle icon upload
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const iconFile = files?.icon?.[0];

    if (iconFile) {
      // Delete old icon
      if (benefit.icon) {
        const publicId = benefit.icon.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`health/${publicId}`);
        }
      }
      benefit.icon = iconFile.path;
    }

    if (text !== undefined) {
      benefit.text = text;
    }

    if (status !== undefined) {
      benefit.status = status;
    }

    await health.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Company benefit updated successfully",
      data: benefit,
    });
    return;
  } catch (error) {
    // Delete uploaded icon if error occurs
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const iconPath = files?.icon?.[0]?.path;

    if (iconPath) {
      const publicId = iconPath.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`health/${publicId}`);
      }
    }

    next(error);
  }
};

// ==================== DELETE COMPANY BENEFIT ====================
export const deleteCompanyBenefit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { benefitId } = req.params;

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    const benefitIndex = health.BenefitForCompanies.benefits.findIndex(
      (b: any) => b._id.toString() === benefitId,
    );

    if (benefitIndex === -1) {
      next(new appError("Benefit not found", 404));
      return;
    }

    // Delete icon from cloudinary
    const benefit = health.BenefitForCompanies.benefits[benefitIndex];
    if (benefit.icon) {
      const publicId = benefit.icon.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`health/${publicId}`);
      }
    }

    // Remove benefit from array
    health.BenefitForCompanies.benefits.splice(benefitIndex, 1);
    await health.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Company benefit deleted successfully",
      data: null,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// ==================== CREATE EMPLOYEE BENEFIT ====================
export const createEmployeeBenefit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { text, status = "active" } = req.body;

    // Validate input
    const validatedData = createEmployeeBenefitValidation.parse({
      text,
      status,
    });

    // Handle icon upload
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const iconFile = files?.icon?.[0];

    if (!iconFile) {
      next(new appError("Icon image is required", 400));
      return;
    }

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    // Create new benefit with uploaded icon
    const newBenefit = {
      icon: iconFile.path,
      text: validatedData.text,
      status: validatedData.status,
    };

    health.BenefitForEmployees.benefits.push(newBenefit);
    await health.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Employee benefit created successfully",
      data: health.BenefitForEmployees.benefits[
        health.BenefitForEmployees.benefits.length - 1
      ],
    });
    return;
  } catch (error) {
    // Delete uploaded icon if error occurs
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const iconPath = files?.icon?.[0]?.path;

    if (iconPath) {
      const publicId = iconPath.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`health/${publicId}`);
      }
    }

    next(error);
  }
};

// ==================== GET ALL EMPLOYEE BENEFITS ====================
export const getAllEmployeeBenefits = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const health = await Health.findOne();

    if (!health) {
      res.json({
        success: true,
        statusCode: 200,
        message: "No benefits found",
        data: {
          title: "",
          subtitle: "",
          benefits: [],
        },
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Employee benefits retrieved successfully",
      data: health.BenefitForEmployees,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// ==================== GET EMPLOYEE BENEFIT BY ID ====================
export const getEmployeeBenefitById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { benefitId } = req.params;

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    const benefit = health.BenefitForEmployees.benefits.find(
      (b: any) => b._id.toString() === benefitId,
    );

    if (!benefit) {
      next(new appError("Benefit not found", 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Employee benefit retrieved successfully",
      data: benefit,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// ==================== UPDATE EMPLOYEE BENEFIT ====================
export const updateEmployeeBenefit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { benefitId } = req.params;
    const { text, status } = req.body;

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    const benefit = health.BenefitForEmployees.benefits.find(
      (b: any) => b._id.toString() === benefitId,
    );

    if (!benefit) {
      next(new appError("Benefit not found", 404));
      return;
    }

    // Handle icon upload
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const iconFile = files?.icon?.[0];

    if (iconFile) {
      // Delete old icon
      if (benefit.icon) {
        const publicId = benefit.icon.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`health/${publicId}`);
        }
      }
      benefit.icon = iconFile.path;
    }

    if (text !== undefined) {
      benefit.text = text;
    }

    if (status !== undefined) {
      benefit.status = status;
    }

    await health.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Employee benefit updated successfully",
      data: benefit,
    });
    return;
  } catch (error) {
    // Delete uploaded icon if error occurs
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const iconPath = files?.icon?.[0]?.path;

    if (iconPath) {
      const publicId = iconPath.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`health/${publicId}`);
      }
    }

    next(error);
  }
};

// ==================== DELETE EMPLOYEE BENEFIT ====================
export const deleteEmployeeBenefit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { benefitId } = req.params;

    const health = await Health.findOne();

    if (!health) {
      next(new appError("Health document not found", 404));
      return;
    }

    const benefitIndex = health.BenefitForEmployees.benefits.findIndex(
      (b: any) => b._id.toString() === benefitId,
    );

    if (benefitIndex === -1) {
      next(new appError("Benefit not found", 404));
      return;
    }

    // Delete icon from cloudinary
    const benefit = health.BenefitForEmployees.benefits[benefitIndex];
    if (benefit.icon) {
      const publicId = benefit.icon.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`health/${publicId}`);
      }
    }

    // Remove benefit from array
    health.BenefitForEmployees.benefits.splice(benefitIndex, 1);
    await health.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Employee benefit deleted successfully",
      data: null,
    });
    return;
  } catch (error) {
    next(error);
  }
};
