import express from 'express'
import { activateUser, loginUser, registerUser } from '../controllers/auth.controller'

import { activationValidation, loginValidation, registrationValidation } from '../validations/authValidations'

import { handleValidationErrors } from '../middlewares/validation'

const authRouter = express.Router();

authRouter.post(
    "/auth/signup",
    registrationValidation,
    handleValidationErrors,
    registerUser
)

authRouter.post(
    "/auth/activate-user",
    activationValidation,
    handleValidationErrors,
    activateUser
  );

authRouter.post(
    "/auth/login",
    loginValidation,
    handleValidationErrors,
    loginUser
);

export default authRouter