import express from "express";
import ProductController from "../controllers/ProductController.js";
import handleFileUpload from "../middlewares/uploadFileMiddleware.js";
import { authenticateToken, protectedRoute } from "../config/jwt.js";
import {
  addProductValidationRules,
  updateProductValidationRules,
  validate,
} from "../middlewares/productValidationMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, protectedRoute, ProductController.get);
router.get(
  "/outlet/(:outletId)/category/(:slug)",
  authenticateToken,
  protectedRoute,
  ProductController.getByCategory
);
router.get(
  "/outlet/(:outletId)",
  authenticateToken,
  protectedRoute,
  ProductController.getByOutlet
);
router.get(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  ProductController.getById
);
router.post(
  "/",
  authenticateToken,
  protectedRoute,
  handleFileUpload,
  addProductValidationRules(),
  validate,
  ProductController.add
);
router.put(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  handleFileUpload,
  updateProductValidationRules(),
  validate,
  ProductController.update
);
router.delete(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  ProductController.delete
);

export default router;
