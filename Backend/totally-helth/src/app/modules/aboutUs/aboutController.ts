// controllers/aboutUs.controller.ts

import { NextFunction, Request, Response } from "express";

import { AboutUs } from "./aboutModel";

import { aboutUsUpdateValidation } from "./aboutValidation";
import { appError } from "../../errors/appError";
import { cloudinary } from "../../config/cloudinary";

export const getAboutUs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let aboutUs = await AboutUs.findOne();

    // If no document exists, create an empty one
    if (!aboutUs) {
      aboutUs = new AboutUs({
        title: "",
        subtitle: "",
        banner: "",
        aboutDescription: "",
        metaTitle: "",
        metaKeyword: "",
        metaDescription: "",
        isActive: true,
      });
      await aboutUs.save();
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "About Us retrieved successfully",
      data: aboutUs,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const updateAboutUs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      subtitle,
      infoTitle1,
      infoSubtitle1,
      infoTitle2,
      infoSubtitle2,
      aboutDescription,
      founderTitle,
      founderName,
      founderDesignation,
      founderDescription,
      aboutInfoTitle,
      aboutInfoSubtitle,
      aboutInfoDescription,
      metaTitle,
      metaKeyword,
      metaDescription,
      isActive,

      // NEW: additionalInfo fields
      additionalInfoTitle,
      additionalInfoSubtitle,
      additionalInfoDescription,
    } = req.body as any;

    // Get existing About Us document or create if not exists
    let aboutUs = await AboutUs.findOne();

    if (!aboutUs) {
      aboutUs = new AboutUs({
        title: "",
        subtitle: "",
        banner: "",
        aboutDescription: "",
        metaTitle: "",
        metaKeyword: "",
        metaDescription: "",
        isActive: true,
      });
    }

    // Handle file uploads
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const bannerFile = files?.banner?.[0];
    const founderImageFile = files?.founderImage?.[0];
    const isoCertificateFile = files?.isoCertificate?.[0];
    const infoBanner1File = files?.infoBanner1?.[0];
    const infoBanner2File = files?.infoBanner2?.[0];
    const infoBanner3File = files?.infoBanner3?.[0];

    // NEW: additionalInfo images
    const additionalImage1File = files?.additionalImage1?.[0];
    const additionalImage2File = files?.additionalImage2?.[0];
    const additionalImage3File = files?.additionalImage3?.[0];

    // Prepare update data
    const updateData: any = {};

    // Text fields (existing)
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (infoTitle1 !== undefined) updateData.infoTitle1 = infoTitle1;
    if (infoSubtitle1 !== undefined) updateData.infoSubtitle1 = infoSubtitle1;
    if (infoTitle2 !== undefined) updateData.infoTitle2 = infoTitle2;
    if (infoSubtitle2 !== undefined) updateData.infoSubtitle2 = infoSubtitle2;
    if (aboutDescription !== undefined)
      updateData.aboutDescription = aboutDescription;

    if (founderTitle !== undefined) updateData.founderTitle = founderTitle;
    if (founderName !== undefined) updateData.founderName = founderName;
    if (founderDesignation !== undefined)
      updateData.founderDesignation = founderDesignation;
    if (founderDescription !== undefined)
      updateData.founderDescription = founderDescription;

    if (aboutInfoTitle !== undefined)
      updateData.aboutInfoTitle = aboutInfoTitle;
    if (aboutInfoSubtitle !== undefined)
      updateData.aboutInfoSubtitle = aboutInfoSubtitle;
    if (aboutInfoDescription !== undefined)
      updateData.aboutInfoDescription = aboutInfoDescription;

    if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
    if (metaKeyword !== undefined) updateData.metaKeyword = metaKeyword;
    if (metaDescription !== undefined)
      updateData.metaDescription = metaDescription;

    if (isActive !== undefined) {
      updateData.isActive = isActive === "true" || isActive === true;
    }

    // NEW: Handle additionalInfo object
    if (
      additionalInfoTitle !== undefined ||
      additionalInfoSubtitle !== undefined ||
      additionalInfoDescription !== undefined ||
      additionalImage1File ||
      additionalImage2File ||
      additionalImage3File
    ) {
      const existingAdditionalInfo = aboutUs.additionalInfo || {};
      const existingImages: string[] = aboutUs.additionalInfo?.images || [];

      updateData.additionalInfo = {
        title: additionalInfoTitle ?? aboutUs.additionalInfo?.title ?? "",
        subtitle:
          additionalInfoSubtitle ?? aboutUs.additionalInfo?.subtitle ?? "",
        description:
          additionalInfoDescription ??
          aboutUs.additionalInfo?.description ??
          "",
        images: [...existingImages],
      };

      // Handle additionalInfo images
      if (additionalImage1File) {
        updateData.additionalInfo.images[0] = additionalImage1File.path;
        // Delete old image if exists
        if (existingImages[0]) {
          const publicId = existingImages[0].split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`about-us/${publicId}`);
          }
        }
      }

      if (additionalImage2File) {
        updateData.additionalInfo.images[1] = additionalImage2File.path;
        if (existingImages[1]) {
          const publicId = existingImages[1].split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`about-us/${publicId}`);
          }
        }
      }

      if (additionalImage3File) {
        updateData.additionalInfo.images[2] = additionalImage3File.path;
        if (existingImages[2]) {
          const publicId = existingImages[2].split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`about-us/${publicId}`);
          }
        }
      }

      // Remove undefined/null from images array
      updateData.additionalInfo.images =
        updateData.additionalInfo.images.filter(Boolean);
    }

    // Handle existing file uploads (banner, founder, etc.) - same as before
    if (bannerFile) {
      updateData.banner = bannerFile.path;
      if (aboutUs.banner) {
        const publicId = aboutUs.banner.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`about-us/${publicId}`);
        }
      }
    }

    if (founderImageFile) {
      updateData.founderImage = founderImageFile.path;
      if (aboutUs.founderImage) {
        const publicId = aboutUs.founderImage.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`about-us/${publicId}`);
        }
      }
    }

    if (isoCertificateFile) {
      updateData.isoCertificate = isoCertificateFile.path;
      if (aboutUs.isoCertificate) {
        const publicId = aboutUs.isoCertificate.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`about-us/${publicId}`);
        }
      }
    }

    if (infoBanner1File) {
      updateData.infoBanner1 = infoBanner1File.path;
      if (aboutUs.infoBanner1) {
        const publicId = aboutUs.infoBanner1.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`about-us/${publicId}`);
        }
      }
    }

    if (infoBanner2File) {
      updateData.infoBanner2 = infoBanner2File.path;
      if (aboutUs.infoBanner2) {
        const publicId = aboutUs.infoBanner2.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`about-us/${publicId}`);
        }
      }
    }

    if (infoBanner3File) {
      updateData.infoBanner3 = infoBanner3File.path;
      if (aboutUs.infoBanner3) {
        const publicId = aboutUs.infoBanner3.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`about-us/${publicId}`);
        }
      }
    }

    // Validate and update
    if (Object.keys(updateData).length > 0) {
      const validatedData = aboutUsUpdateValidation.parse(updateData);

      // Update the document
      const updatedAboutUs = await AboutUs.findOneAndUpdate({}, validatedData, {
        new: true,
        upsert: true,
      });

      res.json({
        success: true,
        statusCode: 200,
        message: "About Us updated successfully",
        data: updatedAboutUs,
      });
      return;
    }

    // If no updates provided
    res.json({
      success: true,
      statusCode: 200,
      message: "No changes to update",
      data: aboutUs,
    });
    return;
  } catch (error) {
    // If error occurs and images were uploaded, delete them
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;

    const uploadedPaths = [
      files?.banner?.[0]?.path,
      files?.founderImage?.[0]?.path,
      files?.isoCertificate?.[0]?.path,
      files?.infoBanner1?.[0]?.path,
      files?.infoBanner2?.[0]?.path,
      files?.infoBanner3?.[0]?.path,
      files?.additionalImage1?.[0]?.path,
      files?.additionalImage2?.[0]?.path,
      files?.additionalImage3?.[0]?.path,
    ].filter(Boolean) as string[];

    for (const path of uploadedPaths) {
      const publicId = path.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`about-us/${publicId}`);
      }
    }

    next(error);
  }
};
