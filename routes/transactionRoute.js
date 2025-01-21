import express from "express";
import TransactionController from "../controllers/TransactionController.js";
import { authenticateToken, protectedRoute } from "../config/jwt.js";
import {
  validateTransaction,
  validate,
} from "../middlewares/transactionValidationMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, protectedRoute, TransactionController.get);
router.get(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  TransactionController.getById
);
router.get(
  "/session/(:sessionId)",
  authenticateToken,
  protectedRoute,
  TransactionController.getBySession
);
router.post(
  "/",
  authenticateToken,
  protectedRoute,
  validateTransaction,
  validate,
  TransactionController.add
);
router.post(
  "/void/(:id)",
  authenticateToken,
  protectedRoute,
  TransactionController.void
);

export default router;
