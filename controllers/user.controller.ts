require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import { isUsernameAvailable, updateUser } from "../db/authDBFunctions";
import { IUpdateUserInfo } from "../types";
import { sendToken } from "../utils/jwt";
import { handleErrors } from "../middlewares/errorHandler";
import { getUser } from "../db/userDBFunctions";
import bcrypt from 'bcryptjs';

export const updateUserInfo = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {
          fullName,
          phoneNumber,
          username,
        } = req.body as IUpdateUserInfo;
  
        const userId = req.user?.id;
  
        let user = await getUser(userId);
  
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
  
        // Check if the updated username is not empty and is unique
        if (
          username?.trim() !== undefined &&
          username?.trim().toLocaleLowerCase() !==
            user?.username?.trim().toLocaleLowerCase()
        ) {
          const isUsernameUnique = await isUsernameAvailable(
            username?.trim().toLocaleLowerCase()
          );
  
          if (!isUsernameUnique) {
            return res.status(400).json({
              success: false,
              message:
                "Username is already taken. Please choose a different one.",
            });
          }
        }
  
        const updatedUser = await updateUser(userId, {
          fullName: fullName || user?.fullName || undefined,
          phoneNumber: phoneNumber,
          username:
            username?.trim().toLocaleLowerCase() ||
            user?.username?.trim().toLocaleLowerCase() ||
            undefined,
        });
  
        sendToken(updatedUser, 200, res);
      } catch (error) {
        handleErrors(error as Error, req, res, next);
      }
    }
);

export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access, please log in again.",
        });
      }

      const user = await getUser(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      await updateUser(userId, {
        password: hashedNewPassword,
      });

      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      handleErrors(error as Error, req, res, next);
    }
  }
);
