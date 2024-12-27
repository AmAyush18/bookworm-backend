import express from 'express'
import { updateUserInfo } from '../controllers/user.controller'

import { handleValidationErrors } from '../middlewares/validation'
import { isAuthenticated } from '../middlewares/auth';
import { updateUserInfoValidation } from '../validations/userValidations';
import { borrowBookValidation } from '../validations/transactionValidations';
import { borrowBookTransaction } from '../controllers/transaction.controller';

const transactionRouter = express.Router();

transactionRouter.post(
    "/transaction/borrow-book",
    isAuthenticated,
    borrowBookValidation,
    handleValidationErrors,
    borrowBookTransaction
  );

export default transactionRouter