import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { 
  checkISBNExistence, 
  countBooks, 
  createBook, 
  deleteBook, 
  getAllBooks, 
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

export const getBook = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
  
        const book = await getBookById(Number(id));
        if (!book) {
          return res.status(404).json({
            success: false,
            message: "Book not found",
          });
        }
  
        res.status(200).json({
          success: true,
          data: book,
        });
      } catch (error) {
        handleErrors(error as Error, req, res, next);
      }
    }
);

export const getBooks = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the query parameters
      const page = parseInt(req.query.page as string) || 1; // Default to page 1
      const limit = parseInt(req.query.limit as string) || 10; // Default to 10 books per page
      const searchQuery = (req.query.search as string) || ""; // Default to no search query

      // Fetch books with pagination and search
      const books = await getAllBooks(page, limit, searchQuery);

      const totalBooks = await countBooks(searchQuery)

      res.status(200).json({
        success: true,
        data: books,
        pagination: {
          page,
          limit,
          totalBooks,
          totalPages: Math.ceil(totalBooks / limit), // Calculate total pages
        },
      });
    } catch (error) {
      handleErrors(error as Error, req, res, next);
    }
  }
);
