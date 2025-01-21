import { body, validationResult } from "express-validator";
import fs from "fs";

export const addCategoryValidationRules = () => [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessage = errors.array().map((error) => error.msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "Error",
      message: "Validation failed",
      errors: errorMessage,
    });
  }
  next();
};
