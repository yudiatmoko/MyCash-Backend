import express from "express";
import UserController from "../controllers/UserController.js";
import uploadImageMiddleware from "../middlewares/uploadImageMiddleware.js";
import {
  registerValidationRules,
  loginValidationRules,
  updatePasswordValidationRules,
  validate,
} from "../middlewares/userValidationMiddleware.js";

const router = express.Router();

router.get("/", UserController.get);
router.get("/(:id)", UserController.getById);
router.post(
  "/register",
  registerValidationRules(),
  validate,
  UserController.register
);
router.post("/login", loginValidationRules(), validate, UserController.login);
router.put(
  "/(:id)",
  registerValidationRules(),
  uploadImageMiddleware,
  validate,
  UserController.update
);
router.put(
  "/(:id)/password",
  updatePasswordValidationRules(),
  validate,
  UserController.updatePassword
);
router.delete("/(:id)", UserController.delete);

export default router;
