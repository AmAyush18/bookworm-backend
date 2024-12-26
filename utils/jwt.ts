require("dotenv").config();
import { Response } from "express";
import { IActivationToken } from "../types";
import jwt, { Secret } from "jsonwebtoken";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const SignAccessToken = function (id: number | undefined) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "1d",
  });
};

const SignRefreshToken = function (id: number | undefined) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "10d",
  });
};

const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (user: any, statusCode: number, res: Response) => {
  const accessToken = SignAccessToken(user.id);
  const refreshToken = SignRefreshToken(user.id);

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user: {
      ...user,
      accessToken
    },
  });
};

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "15m",
    }
  );

  return { token, activationCode };
};
