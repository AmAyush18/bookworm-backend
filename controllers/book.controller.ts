import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { 
  checkISBNExistence, 
  createBook 
} from "../db/bookDBFunctions";
import { handleErrors } from "../middlewares/errorHandler";

export const addBook = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, author, genre, publishedYear, isbn } = req.body;

      if (isbn) {
        const existingBook = await checkISBNExistence(isbn);
        if (existingBook) {
          return res.status(400).json({
            success: false,
            message: "A book with this ISBN already exists",
          });
        }
      }

      const newBook = await createBook({
        title,
        author,
        genre,
        publishedYear: parseInt(publishedYear),
        isbn,
      });

      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newBook,
      });
    } catch (error) {
      handleErrors(error as Error, req, res, next);
    }
  }
);
