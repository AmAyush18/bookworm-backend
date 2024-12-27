import { body } from "express-validator";

export const registrationValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password should contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain at least one digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password should contain at least one special character"),
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("username").notEmpty().withMessage("Username is required"),
];

export const activationValidation = [
    body("activation_token")
      .notEmpty()
      .withMessage("Activation token is required"),
    body("activation_code")
      .isNumeric()
      .withMessage("Activation code should be numeric"),
];

export const loginValidation = [
    body("email").isEmail().withMessage("Invalid email format"),
];
