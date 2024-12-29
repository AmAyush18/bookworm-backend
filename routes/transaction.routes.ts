import express from 'express';
import { handleValidationErrors } from '../middlewares/validation';
import { isAuthenticated } from '../middlewares/auth';
import { borrowBookValidation, returnBookValidation } from '../validations/transactionValidations';
import { borrowBookTransaction, returnBookTransaction } from '../controllers/transaction.controller';

const transactionRouter = express.Router();

/**
 * @swagger
 * /transaction/borrow-book:
 *   post:
 *     summary: Borrow a book
 *     description: Allows an authenticated user to borrow a book from the collection.
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Invalid book ID or the book is already borrowed
 *       401:
 *         description: Unauthorized, user needs to be authenticated
 *       500:
 *         description: Internal server error
 */
transactionRouter.post(
    "/transaction/borrow-book",
    isAuthenticated,
    borrowBookValidation,
    handleValidationErrors,
    borrowBookTransaction
);

/**
 * @swagger
 * /transaction/return-book:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows an authenticated user to return a borrowed book.
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Invalid book ID or book not borrowed
 *       401:
 *         description: Unauthorized, user needs to be authenticated
 *       500:
 *         description: Internal server error
 */
transactionRouter.post(
    "/transaction/return-book",
    isAuthenticated,
    returnBookValidation,
    handleValidationErrors,
    returnBookTransaction
);

export default transactionRouter;
