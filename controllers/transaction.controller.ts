import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { handleErrors } from "../middlewares/errorHandler";
import { borrowBook, checkBookAvailability, updateBorrowedCount } from "../db/transactionDBFunctions";

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
