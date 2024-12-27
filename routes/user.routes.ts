import express from 'express'
import { updateUserInfo } from '../controllers/user.controller'

import { handleValidationErrors } from '../middlewares/validation'
import { isAuthenticated } from '../middlewares/auth';
import { updateUserInfoValidation } from '../validations/userValidations';

const userRouter = express.Router();

userRouter.put(
    "/user/update-profile",
    updateUserInfoValidation,
    handleValidationErrors,
    isAuthenticated,
    updateUserInfo
  );

export default userRouter