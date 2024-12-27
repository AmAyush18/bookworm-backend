import express from 'express'
import { handleValidationErrors } from '../middlewares/validation'
import { isAuthenticated } from '../middlewares/auth';
import { borrowBookValidation, returnBookValidation } from '../validations/transactionValidations';
import { borrowBookTransaction, returnBookTransaction } from '../controllers/transaction.controller';

const transactionRouter = express.Router();

transactionRouter.post(
    "/transaction/borrow-book",
    isAuthenticated,
    borrowBookValidation,
    handleValidationErrors,
    borrowBookTransaction
  );

  transactionRouter.post(
    "/transaction/return-book",
    isAuthenticated,
    returnBookValidation,
    handleValidationErrors,
    returnBookTransaction
  );

export default transactionRouter