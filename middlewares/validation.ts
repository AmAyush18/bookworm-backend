import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    return res.status(400).json({
      success: false,
      message,
    });
  }
  next();
};
