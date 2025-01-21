import { body, validationResult } from "express-validator";

export const validateTransaction = [
  body("totalPayment")
    .notEmpty()
    .withMessage("Total payment is required")
    .isNumeric()
    .withMessage("Total payment must be a number")
    .custom((value) => value > 0)
    .withMessage("Total payment must be greater than 0"),
  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["CASH", "QRIS"])
    .withMessage("Payment method must be either 'CASH' or 'QRIS'"),
  body("note").optional().isString().withMessage("Note must be a string"),
  body("detail.*.productQty")
    .notEmpty()
    .withMessage("Product qty is required")
    .isInt({ min: 1 })
    .withMessage("Each product qty must be an integer greater than 0"),
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
