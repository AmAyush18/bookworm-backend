import express from "express";
import { addBook, deleteBookById, getBook, getBooks, updateBookDetails } from "../controllers/book.controller";
import { handleValidationErrors } from "../middlewares/validation";
import { addBookValidation, updateBookValidation } from "../validations/bookValidations";
import { isAuthenticated } from "../middlewares/auth";

const bookRouter = express.Router();

/**
 * @swagger
 * /book/add:
 *   post:
 *     summary: Add a new book
 *     description: Adds a new book to the collection with title, author, genre, published year, and ISBN.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 example: "Classic Fiction"
 *               publishedYear:
 *                 type: integer
 *                 example: 1925
 *               isbn:
 *                 type: string
 *                 example: "9780743273565"
 *     responses:
 *       201:
 *         description: Book added successfully
 *       400:
 *         description: Invalid input or book already exists
 *       500:
 *         description: Internal server error
 */
bookRouter.post(
    "/book/add",
    addBookValidation,
    isAuthenticated,
    handleValidationErrors,
    addBook
);

/**
 * @swagger
 * /book/update/{id}:
 *   put:
 *     summary: Update book details
 *     description: Updates the details of a specific book identified by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *               publishedYear:
 *                 type: integer
 *                 example: 1925
 *               isbn:
 *                 type: string
 *                 example: "9780743273565"
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid input or book not found
 *       500:
 *         description: Internal server error
 */
bookRouter.put(
    "/book/update/:id",
    updateBookValidation,
    isAuthenticated,
    handleValidationErrors,
    updateBookDetails
);

/**
 * @swagger
 * /book/delete/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes a specific book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
bookRouter.delete(
    "/book/delete/:id",
    isAuthenticated,
    deleteBookById
);

/**
 * @swagger
 * /book/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieves the details of a specific book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "The Great Gatsby"
 *                 author:
 *                   type: string
 *                   example: "F. Scott Fitzgerald"
 *                 genre:
 *                   type: string
 *                   example: "Classic Fiction"
 *                 publishedYear:
 *                   type: integer
 *                   example: 1925
 *                 isbn:
 *                   type: string
 *                   example: "9780743273565"
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
bookRouter.get(
    "/book/:id",
    getBook
);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books with pagination and search
 *     description: Fetch a list of books with support for pagination and search functionality.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of books per page (default is 10).
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *           default: ""
 *         description: Search term to filter books by title or author.
 *     responses:
 *       200:
 *         description: A list of books with pagination details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "The Great Gatsby"
 *                       author:
 *                         type: string
 *                         example: "F. Scott Fitzgerald"
 *                       genre:
 *                         type: string
 *                         example: "Fiction"
 *                       publishedYear:
 *                         type: integer
 *                         example: 1925
 *                       isbn:
 *                         type: string
 *                         example: "9780743273565"
 *                       isAvailable:
 *                         type: boolean
 *                         example: true
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalBooks:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Bad request, invalid query parameters.
 *       500:
 *         description: Internal server error.
 */

bookRouter.get(
    "/books",
    getBooks
);

export default bookRouter;
