import express from "express";
import OutletController from "../controllers/OutletController.js";
import handleFileUpload from "../middlewares/uploadFileMiddleware.js";
import { authenticateToken, protectedRoute } from "../config/jwt.js";
import {
  addOutletValidationRules,
  updateOutletValidationRules,
  validate,
} from "../middlewares/outletValidationMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, protectedRoute, OutletController.get);
router.get(
  "/user",
  authenticateToken,
  protectedRoute,
  OutletController.getByUser
);
router.get(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  OutletController.getById
);
router.post(
  "/",
  authenticateToken,
  protectedRoute,
  addOutletValidationRules(),
  validate,
  OutletController.add
);
router.put(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  updateOutletValidationRules(),
  handleFileUpload,
  validate,
  OutletController.update
);
router.delete(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  OutletController.delete
);

export default router;
