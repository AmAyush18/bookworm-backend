import express from 'express'
import { registerUser } from '../controllers/auth.controller'

import { registrationValidation } from '../validations/authValidations'

import { handleValidationErrors } from '../middlewares/validation'

const authRouter = express.Router();

authRouter.post(
    "/auth/signup",
    registrationValidation,
    // handleValidationErrors,
    registrationValidation,
    registerUser
)

export default authRouter