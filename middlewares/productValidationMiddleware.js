import { body, validationResult } from "express-validator";

export const addProductValidationRules = () => [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
];

export const updateProductValidationRules = () => [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
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
