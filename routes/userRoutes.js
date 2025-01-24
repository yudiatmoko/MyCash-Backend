import express from "express";
import UserController from "../controllers/UserController.js";
import handleFileUpload from "../middlewares/uploadFileMiddleware.js";
import { authenticateToken } from "../config/jwt.js";
import {
  registerValidationRules,
  loginValidationRules,
  updateValidationRules,
  updatePasswordValidationRules,
  validate,
} from "../middlewares/userValidationMiddleware.js";

const router = express.Router();

router.get("/", UserController.get);
router.get("/(:id)", authenticateToken, UserController.getById);
router.post(
  "/register",
  registerValidationRules(),
  validate,
  UserController.register
);
router.post("/login", loginValidationRules(), validate, UserController.login);
router.put(
  "/(:id)",
  authenticateToken,
  updateValidationRules(),
  handleFileUpload,
  validate,
  UserController.update
);
router.put(
  "/(:id)/password",
  authenticateToken,
  updatePasswordValidationRules(),
  validate,
  UserController.updatePassword
);
router.delete("/(:id)", authenticateToken, UserController.delete);
router.post("/generate-otp", authenticateToken, UserController.generateOtp);
router.post("/verify-otp", authenticateToken, UserController.verifyOtp);
router.post("/reset-password", authenticateToken, UserController.resetPassword);

export default router;
