import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { 
  checkISBNExistence, 
  createBook, 
  deleteBook, 
  getBookById, 
  updateBook
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

export const updateBookDetails = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params; 
        const updateData = req.body;
  
        const existingBook = await getBookById(Number(id));
        if (!existingBook) {
          return res.status(404).json({
            success: false,
            message: "Book not found",
          });
        }
  
        const updatedBook = await updateBook(Number(id), updateData);
  
        res.status(200).json({
          success: true,
          message: "Book updated successfully",
          data: updatedBook,
        });
      } catch (error) {
        handleErrors(error as Error, req, res, next);
      }
    }
);

export const deleteBookById = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
  
        const existingBook = await getBookById(Number(id));
        if (!existingBook) {
          return res.status(404).json({
            success: false,
            message: "Book not found",
          });
        }
  
        await deleteBook(Number(id));
  
        res.status(200).json({
          success: true,
          message: "Book deleted successfully",
        });
      } catch (error) {
        handleErrors(error as Error, req, res, next);
      }
    }
);
