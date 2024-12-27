import express from 'express'
import { activateUser, registerUser } from '../controllers/auth.controller'

import { activationValidation, registrationValidation } from '../validations/authValidations'

import { handleValidationErrors } from '../middlewares/validation'

const authRouter = express.Router();

authRouter.post(
    "/auth/signup",
    registrationValidation,
    handleValidationErrors,
    registrationValidation,
    registerUser
)

authRouter.post(
    "/auth/activate-user",
    activationValidation,
    handleValidationErrors,
    activateUser
  );

export default authRouter