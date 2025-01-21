import { body, validationResult } from "express-validator";
import fs from "fs";

export const addOutletValidationRules = () => [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isString()
    .withMessage("Type must be a string"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone number must be numeric"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("district")
    .notEmpty()
    .withMessage("District is required")
    .isString()
    .withMessage("District must be a string"),
  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string"),
  body("province")
    .notEmpty()
    .withMessage("Province is required")
    .isString()
    .withMessage("Province must be a string"),
];

export const updateOutletValidationRules = () => [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("type").optional().isString().withMessage("Type must be a string"),
  body("phoneNumber")
    .optional()
    .isNumeric()
    .withMessage("Phone number must be numeric"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("district")
    .optional()
    .isString()
    .withMessage("District must be a string"),
  body("city").optional().isString().withMessage("City must be a string"),
  body("province")
    .optional()
    .isString()
    .withMessage("Province must be a string"),
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
      message: "Validation failed",
      errors: errorMessage,
    });
  }
  next();
};
