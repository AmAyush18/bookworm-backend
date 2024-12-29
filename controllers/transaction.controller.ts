import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { handleErrors } from "../middlewares/errorHandler";
import { borrowBook, checkBookAvailability, updateBorrowedCount,returnBook, findBorrowedBook, updateBookAvailability } from "../db/transactionDBFunctions";

export const borrowBookTransaction = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.body;
    const loggedInUserId = req.user?.id;

    if (!loggedInUserId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user, please log in again",
      });
    }

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

      // Proceed with borrowing the book, using the logged-in user's ID
      await borrowBook(loggedInUserId, bookId);
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
    const { bookId } = req.body;
    const loggedInUserId = req.user?.id;  // Get userId from the logged-in user (set by the isAuthenticated middleware)

    if (!loggedInUserId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user, please log in again",
      });
    }

    try {
      // Find the book transaction for the logged-in user
      const transaction = await findBorrowedBook(loggedInUserId, bookId);
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "No active borrowing transaction found for this book",
        });
      }

      // Proceed with returning the book
      await returnBook(transaction.id);
      await updateBookAvailability(bookId);

      res.status(200).json({
        success: true,
        message: "Book returned successfully",
      });
    } catch (error) {
      handleErrors(error as Error, req, res, next);
    }
  }
);
