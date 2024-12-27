import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { handleErrors } from "../middlewares/errorHandler";
import { borrowBook, checkBookAvailability, findBorrowedBook, returnBook, updateBookAvailability, updateBorrowedCount } from "../db/transactionDBFunctions";

export const borrowBookTransaction = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, bookId } = req.body;

    try {
      // Check if the book exists and is available
      const book = await checkBookAvailability(bookId);
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      if (!book.isAvailable) {
        return res.status(400).json({
          success: false,
          message: "Book is not available for borrowing",
        });
      }

      // Create transaction and update the borrowed count
      await borrowBook(userId, bookId);
      await updateBorrowedCount(bookId);

      res.status(200).json({
        success: true,
        message: "Book borrowed successfully",
      });
    } catch (error) {
      handleErrors(error as Error, req, res, next);
    }
  }
);

export const returnBookTransaction = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, bookId } = req.body;

    try {
      const transaction = await findBorrowedBook(userId, bookId);
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "No active borrowing transaction found for this book",
        });
      }

      // Update the transaction with the returned date
      await returnBook(transaction.id);
      updateBookAvailability(bookId)      

      res.status(200).json({
        success: true,
        message: "Book returned successfully",
      });
    } catch (error) {
      handleErrors(error as Error, req, res, next);
    }
  }
);
