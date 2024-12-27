import express from "express";
import { addBook } from "../controllers/book.controller";
import { handleValidationErrors } from "../middlewares/validation";
import { addBookValidation } from "../validations/bookValidations";

const bookRouter = express.Router();

bookRouter.post(
    "/book/add",
    addBookValidation,
    handleValidationErrors,
    addBook
);

export default bookRouter