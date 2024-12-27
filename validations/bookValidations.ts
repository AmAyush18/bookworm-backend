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
