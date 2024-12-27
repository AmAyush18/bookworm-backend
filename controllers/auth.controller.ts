require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import bcrypt, { compare } from "bcryptjs";
import { checkEmailExistence, checkUserExistence, createUser } from "../db/authDBFunctions";
import { IRegistrationBody, IActivationToken, IActivationRequest, ILoginRequest } from "../types";
import jwt from "jsonwebtoken";
import { createActivationToken, sendToken } from "../utils/jwt";
import ErrorHandler, { handleErrors } from "../middlewares/errorHandler";
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

  export const activateUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {
          activation_token,
          activation_code,
        } = req.body as IActivationRequest;
  
        const newUser = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET as string
        ) as { user: IRegistrationBody; activationCode: string };
  
        if (newUser.activationCode !== activation_code) {
          return res
            .status(401)
            .json({ success: false, error: "Invalid OTP, Please try again!" });
        }
  
        const { email, username, fullName, password } = newUser.user;
  
        if (await checkEmailExistence(email)) {
          return next(new ErrorHandler("Email already exist", 400));
        }
  
        let updatedUser = {
          email,
          username,
          fullName,
          password,
        };
  
        const user = await createUser(updatedUser, activation_token);
      
        sendToken(user, 201, res);
      } catch (error) {
        handleErrors(error as Error, req, res, next);
      }
    }
  );

  export const loginUser = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body as ILoginRequest;
  
        let existingUser = await checkUserExistence(email);
        let sendWelcomeMessageFlag = false;
  
        if (!existingUser) {
          return res.status(404).json({
            success: false,
            message: "User not found, please check your email",
          });
        }
  
        const passwordMatch = await compare(
          password,
          existingUser.password || ""
        );
  
        if (!passwordMatch) {
          return res.status(400).json({
            success: false,
            message: "Username or password is invalid!",
          });
        }
  
        sendToken(existingUser, 200, res);
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