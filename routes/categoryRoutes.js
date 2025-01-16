import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import { authenticateToken, protectedRoute } from "../config/jwt.js";
import {
  addCategoryValidationRules,
  validate,
} from "../middlewares/categoryValidationMiddleware copy.js";

const router = express.Router();

router.get("/", authenticateToken, protectedRoute, CategoryController.get);
router.get(
  "/outlet/(:id)",
  authenticateToken,
  protectedRoute,
  CategoryController.getByOutlet
);
router.get(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  CategoryController.getById
);
router.post(
  "/",
  authenticateToken,
  protectedRoute,
  addCategoryValidationRules(),
  validate,
  CategoryController.add
);
router.delete(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  CategoryController.delete
);

export default router;
