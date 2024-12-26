require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import bcrypt, { compare } from "bcryptjs";
import { checkEmailExistence } from "../db/authDBFunctions";
import { IRegistrationBody } from "../types";
import { createActivationToken } from "../utils/jwt";
import { handleErrors } from "../middlewares/errorHandler";
import sendMail from "../utils/sendMail";

export const registerUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password, fullName, username } = req.body;
  
        if (await checkEmailExistence(email)) {
          return res.status(400).json({
            success: false,
            message: `Email Already existed!`,
          });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const user: IRegistrationBody = {
          email,
          password: hashedPassword,
          fullName,
          username
        };
  
        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode;
  
        await sendActivationMail(email, activationCode);
  
        res.status(201).json({
          success: true,
          message: `Please check your email: ${email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error) {
        handleErrors(error as Error, req, res, next);
      }
    }
  );

  export const sendActivationMail = async (
    email: string,
    activationCode: string
  ) => {
    const data = { activationCode };
  
    await sendMail({
      email,
      subject: "Activate Your Trackier Assignment Account",
      template: "activation-mail.ejs",
      data,
    });
  };