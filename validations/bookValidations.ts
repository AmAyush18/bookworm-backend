import { body } from "express-validator";

export const addBookValidation = [
    body("title").notEmpty().withMessage("Book title is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("genre").notEmpty().withMessage("Genre is required"),
    body("publishedYear")
        .isInt({ min: 0 })
        .withMessage("Published year should be a valid year"),
    body("isbn").optional().isISBN().withMessage("Invalid ISBN format"),
];

export const updateBookValidation = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title should not be empty"),
  body("author")
    .optional()
    .notEmpty()
    .withMessage("Author should not be empty"),
  body("genre")
    .optional()
    .notEmpty()
    .withMessage("Genre should not be empty"),
  body("publishedYear")
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year between 1900 and current year"),
  body("isbn")
    .optional()
    .isISBN()
    .withMessage("ISBN must be a valid ISBN number"),
  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean value"),
  body("borrowedCount")
    .optional()
    .isInt({ min: 0 })
    .withMessage("borrowedCount must be a non-negative integer")
];
