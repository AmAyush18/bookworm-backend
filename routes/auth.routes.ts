import express from 'express';
import { activateUser, loginUser, logoutUser, registerUser } from '../controllers/auth.controller';
import { activationValidation, loginValidation, registrationValidation } from '../validations/authValidations';
import { handleValidationErrors } from '../middlewares/validation';
import { isAuthenticated } from '../middlewares/auth';

const authRouter = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a user to register by providing their email, password, full name, and username.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPassword123!"
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 *       500:
 *         description: Internal server error
 */
authRouter.post(
    "/auth/signup",
    registrationValidation,
    handleValidationErrors,
    registerUser
);

/**
 * @swagger
 * /auth/activate-user:
 *   post:
 *     summary: Activate a user account
 *     description: This endpoint allows a user to activate their account by providing the activation token and activation code received via email.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activation_token:
 *                 type: string
 *                 example: "activationToken123"
 *               activation_code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: User account activated successfully
 *       400:
 *         description: Invalid token or code
 *       500:
 *         description: Internal server error
 */
authRouter.post(
    "/auth/activate-user",
    activationValidation,
    handleValidationErrors,
    activateUser
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an existing user
 *     description: This endpoint allows a user to login using their email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPassword123!"
 *     responses:
 *       200:
 *         description: Login successful, JWT token returned
 *       400:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
authRouter.post(
    "/auth/login",
    loginValidation,
    handleValidationErrors,
    loginUser
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout the user
 *     description: This endpoint allows a user to log out by clearing their access and refresh tokens stored in cookies.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

authRouter.get(
    "/auth/logout", 
    isAuthenticated, 
    logoutUser
);


export default authRouter;