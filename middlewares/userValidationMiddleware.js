import { body, validationResult } from "express-validator";
import fs from "fs";

export const registerValidationRules = () => [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("phoneNumber")
    .optional()
    .isNumeric()
    .withMessage("Phone number must be numeric"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const loginValidationRules = () => [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const updatePasswordValidationRules = () => [
  body("newPassword")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessage = errors.array().map((error) => error.msg);
  if (!errors.isEmpty()) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    return res.status(400).json({
      status: "Error",
      message: errorMessage,
    });
  }
  next();
};
