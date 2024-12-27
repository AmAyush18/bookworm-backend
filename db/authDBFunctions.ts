import prisma from "./db.config";
import jwt from "jsonwebtoken";
import { IRegistrationBody } from "../types";

export const checkEmailExistence = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const isUsernameAvailable = async (username: string) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });
  
    return !existingUser;
  };
  

export const createUser = async (
    user: IRegistrationBody,
    activation_token: string
  ) => {
    const refresh_token = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN || "",
      {
        expiresIn: "10d",
      }
    );
  
    return await prisma.user.create({
      data: {
        ...user,
        accessToken: activation_token,
        refreshToken: refresh_token,
      },
    });
  };

  export const updateUser = async (
    userId: number | undefined,
    updatedUserData: any
  ) => {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: updatedUserData,
    });
  };

  export const checkUserExistence = async (email: string) => {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  };
  