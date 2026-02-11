import express from "express";
import {
  createContract,
  getAllContracts,
  deleteContractById,
} from "./contract.controller";
import { auth } from "../../middlewares/authMiddleware";

const router = express.Router();

// Create a new contract (public route - no auth needed)
router.post("/", createContract);

// Get all contracts (admin only)
router.get("/", auth("admin"), getAllContracts);

// Delete a contract by ID (admin only)
router.delete("/:id", auth("admin"), deleteContractById);

export const contractRouter = router;
