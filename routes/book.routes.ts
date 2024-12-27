import express from "express";
import { addBook, updateBookDetails } from "../controllers/book.controller";
import { handleValidationErrors } from "../middlewares/validation";
import { addBookValidation } from "../validations/bookValidations";
import { isAuthenticated } from "../middlewares/auth";

const bookRouter = express.Router();

bookRouter.post(
    "/book/add",
    isAuthenticated,
    addBookValidation,
    handleValidationErrors,
    addBook
);

bookRouter.put(
    "/book/update/:id",
    isAuthenticated,
    handleValidationErrors,
    updateBookDetails
);

export default bookRouter