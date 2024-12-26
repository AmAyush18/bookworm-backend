// errorHandlerMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof TokenExpiredError) {
    return res
      .status(401)
      .json({ success: false, message: "Activation token has expired" });
  }

  if (error instanceof ErrorHandler) {
    const statusCode: number = +(error.statusCode || 500);
    return res
      .status(statusCode)
      .json({ success: false, message: error.message });
  }

  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
};

class ErrorHandler extends Error {
  statusCode: number; // Change "Number" to "number"
  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
