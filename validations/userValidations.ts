import { body } from "express-validator";

export const updateUserInfoValidation = [
    body("fullName").optional().notEmpty().withMessage("Full name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("phoneNumber").optional(),
    body("phoneNumber")
      .optional()
      .custom((value) => {
        if (value && isNaN(value)) {
          throw new Error("Phone number must be numeric");
        }
  
        // Check if the length is between 10 and 15 digits
        if (value && (value.length < 10 || value.length > 15)) {
          throw new Error("Phone number must be between 10 and 15 digits");
        }
  
        return true;
      }),
];

export const updateUserPasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current Password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password should contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password should contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain at least one digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password should contain at least one special character")
]