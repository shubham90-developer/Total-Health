// services.controller.ts
import { NextFunction, Request, Response } from "express";
import { Service } from "./servicesModel";
import { appError } from "../../errors/appError";
import { cloudinary } from "../../config/cloudinary";
import {
  createServiceValidation,
  updateServiceValidation,
} from "./servicesValidation";

// ==================== GET ALL SERVICES ====================
export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let document = await Service.findOne();

    if (!document) {
      document = new Service({ sections: [] });
      await document.save();
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Services retrieved successfully",
      data: document.sections,
    });
    return;
  } catch (error) {
    next(error);
  }
};

// ==================== CREATE SERVICE ====================
export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate input
    const validatedData = createServiceValidation.parse({
      title: req.body.title,
      description: req.body.description,
    });

    // Handle image upload
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const imageFile = files?.image?.[0];

    if (!imageFile) {
      next(new appError("Image is required", 400));
      return;
    }

    let document = await Service.findOne();

    if (!document) {
      document = new Service({ sections: [] });
    }

    const newService = {
      title: validatedData.title,
      description: validatedData.description,
      image: imageFile.path,
    };

    document.sections.push(newService);
    await document.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Service created successfully",
      data: document.sections[document.sections.length - 1],
    });
    return;
  } catch (error) {
    // Delete uploaded image if error occurs
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const imagePath = files?.image?.[0]?.path;

    if (imagePath) {
      const publicId = imagePath.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`services/${publicId}`);
      }
    }

    next(error);
  }
};

// ==================== UPDATE SERVICE ====================
export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { serviceId } = req.params;

    // Validate input
    const validatedData = updateServiceValidation.parse({
      title: req.body.title,
      description: req.body.description,
    });

    const document = await Service.findOne();

    if (!document) {
      next(new appError("Services document not found", 404));
      return;
    }

    const service = document.sections.find(
      (s: any) => s._id.toString() === serviceId,
    );

    if (!service) {
      next(new appError("Service not found", 404));
      return;
    }

    // Handle image upload
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const imageFile = files?.image?.[0];

    if (imageFile) {
      // Delete old image from cloudinary
      if (service.image) {
        const publicId = service.image.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`services/${publicId}`);
        }
      }
      service.image = imageFile.path;
    }

    if (validatedData.title !== undefined) {
      service.title = validatedData.title;
    }

    if (validatedData.description !== undefined) {
      service.description = validatedData.description;
    }

    await document.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Service updated successfully",
      data: service,
    });
    return;
  } catch (error) {
    // Delete uploaded image if error occurs
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const imagePath = files?.image?.[0]?.path;

    if (imagePath) {
      const publicId = imagePath.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`services/${publicId}`);
      }
    }

    next(error);
  }
};

// ==================== DELETE SERVICE ====================
export const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { serviceId } = req.params;

    const document = await Service.findOne();

    if (!document) {
      next(new appError("Services document not found", 404));
      return;
    }

    const serviceIndex = document.sections.findIndex(
      (s: any) => s._id.toString() === serviceId,
    );

    if (serviceIndex === -1) {
      next(new appError("Service not found", 404));
      return;
    }

    // Delete image from cloudinary
    const service = document.sections[serviceIndex];
    if (service.image) {
      const publicId = service.image.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`services/${publicId}`);
      }
    }

    // Remove service from array
    document.sections.splice(serviceIndex, 1);
    await document.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Service deleted successfully",
      data: null,
    });
    return;
  } catch (error) {
    next(error);
  }
};
