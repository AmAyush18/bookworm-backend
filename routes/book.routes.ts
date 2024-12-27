import express from "express";
import { addBook, deleteBookById, updateBookDetails } from "../controllers/book.controller";
import { handleValidationErrors } from "../middlewares/validation";
import { addBookValidation, updateBookValidation } from "../validations/bookValidations";
import { isAuthenticated } from "../middlewares/auth";

const bookRouter = express.Router();

bookRouter.post(
    "/book/add",
    addBookValidation,
    isAuthenticated,
    handleValidationErrors,
    addBook
);

bookRouter.put(
    "/book/update/:id",
    updateBookValidation,
    isAuthenticated,
    handleValidationErrors,
    updateBookDetails
);

bookRouter.delete(
    "/book/delete/:id",
    deleteBookById
);

export default bookRouter