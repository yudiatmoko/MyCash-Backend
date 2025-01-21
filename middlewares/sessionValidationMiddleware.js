import { body, validationResult } from "express-validator";
import fs from "fs";

export const addSessionValidationRules = () => [
  body("date").notEmpty().withMessage("Date is required"),
  body("shift")
    .notEmpty()
    .withMessage("Shift is required")
    .isString()
    .withMessage("Shift must be a string.")
    .isIn(["MORNING", "EVENING"])
    .withMessage("Shift must be one of the following: MORNING and EVENING."),
  body("startingCash")
    .notEmpty()
    .withMessage("Starting cash is required")
    .isFloat({ gt: 0 })
    .withMessage("Starting cash must be a positive number."),
];

export const updateSessionValidationRules = () => [
  body("date").optional().isDate().withMessage("Date must be a valid date."),
  body("shift")
    .optional()
    .isString()
    .withMessage("Shift must be a string.")
    .isIn(["MORNING", "EVENING"])
    .withMessage("Shift must be one of the following: MORNING and EVENING."),
  body("startingCash")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Starting cash must be a positive number."),
  body("totalRevenue")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Total revenue must be a positive number."),
  body("checkOutTime")
    .optional()
    .isDate()
    .withMessage("Check out time must be a valid date."),
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
