import express from "express";
import RecapController from "../controllers/RecapController.js";
import { authenticateToken, protectedRoute } from "../config/jwt.js";

const router = express.Router();

router.get(
  "/(:outletId)/",
  authenticateToken,
  protectedRoute,
  RecapController.getSessionRecap
);

export default router;
