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