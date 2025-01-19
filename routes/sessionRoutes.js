import express from "express";
import SessionController from "../controllers/SessionsController.js";
import { authenticateToken, protectedRoute } from "../config/jwt.js";
import {
  addSessionValidationRules,
  updateSessionValidationRules,
  validate,
} from "../middlewares/sessionValidationMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, protectedRoute, SessionController.get);
router.get(
  "/outlet/(:outletId)",
  authenticateToken,
  protectedRoute,
  SessionController.getByOutlet
);
router.get(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  SessionController.getById
);
router.post(
  "/",
  authenticateToken,
  protectedRoute,
  addSessionValidationRules(),
  validate,
  SessionController.add
);
router.put(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  updateSessionValidationRules(),
  validate,
  SessionController.update
);
router.delete(
  "/(:id)",
  authenticateToken,
  protectedRoute,
  SessionController.delete
);

export default router;
