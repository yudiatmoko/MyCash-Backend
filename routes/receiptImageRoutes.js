import express from "express";
import ReceiptController from "../controllers/ReceiptController.js";
import handleFileUpload from "../middlewares/uploadFileMiddleware.js";
import { authenticateToken, protectedRoute } from "../config/jwt.js";

const router = express.Router();

router.post(
  "/session/(:sessionId)",
  authenticateToken,
  protectedRoute,
  handleFileUpload,
  ReceiptController.createSessionImage
);
router.post(
  "/transaction/(:transactionId)",
  authenticateToken,
  protectedRoute,
  handleFileUpload,
  ReceiptController.createTransactionImage
);

export default router;
