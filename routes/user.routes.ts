import express from 'express';
import { updatePassword, updateUserInfo } from '../controllers/user.controller';
import { handleValidationErrors } from '../middlewares/validation';
import { isAuthenticated } from '../middlewares/auth';
import { updateUserInfoValidation, updateUserPasswordValidation } from '../validations/userValidations';

const userRouter = express.Router();

/**
 * @swagger
 * /user/update-profile:
 *   put:
 *     summary: Update user profile information
 *     description: Allows an authenticated user to update their profile information.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 example: "johndoe123"
 *               phoneNumber:
 *                 type: number
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Invalid user input or validation errors
 *       401:
 *         description: Unauthorized, user needs to be authenticated
 *       500:
 *         description: Internal server error
 */
userRouter.put(
    "/user/update-profile",
    updateUserInfoValidation,
    handleValidationErrors,
    isAuthenticated,
    updateUserInfo
);

/**
 * @swagger
 * /api/v1/user/update-password:
 *   put:
 *     summary: Update User Password
 *     description: This API allows the user to update their password by verifying their current password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The user's current password.
 *                 example: oldPassword123
 *               newPassword:
 *                 type: string
 *                 description: The new password the user wants to set.
 *                 example: newSecurePassword456
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password updated successfully.
 *       400:
 *         description: Bad request, invalid current password or new password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Current password is incorrect"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       401:
 *         description: Unauthorized, user must be logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access, please log in again."
 * 
 */
userRouter.put(
  "/user/update-password",
  isAuthenticated,
  updateUserPasswordValidation,
  handleValidationErrors,
  updatePassword
);

export default userRouter;
