import { NextFunction, Request, Response } from "express";
import { Contract } from "./contract.model";
import {
  contractValidation,
  contractUpdateValidation,
} from "./contract.validation";
import { appError } from "../../errors/appError";

export const createContract = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, subject, emailAddress, message } = req.body;

    // Validate the input
    const validatedData = contractValidation.parse({
      name,
      subject,
      emailAddress,
      message,
    });

    // Create a new contract
    const contract = new Contract(validatedData);
    await contract.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Contact message submitted successfully",
      data: contract,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllContracts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Filter by status if requested
    const { status } = req.query;
    const filter: any = { isDeleted: false };

    if (
      status &&
      ["pending", "approved", "rejected"].includes(status as string)
    ) {
      filter.status = status;
    }

    const contracts = await Contract.find(filter).sort({ createdAt: -1 });

    if (contracts.length === 0) {
      res.json({
        success: true,
        statusCode: 200,
        message: "No contacts found",
        data: [],
      });
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Contacts retrieved successfully",
      data: contracts,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteContractById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contract = await Contract.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );

    if (!contract) {
      next(new appError("Contact not found", 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: "Contact deleted successfully",
      data: contract,
    });
    return;
  } catch (error) {
    next(error);
  }
};
