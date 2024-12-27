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