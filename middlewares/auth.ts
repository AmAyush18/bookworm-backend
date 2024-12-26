import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncError";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

// Middleware to verify token based on the route
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token =
      req.headers.authorization?.split(" ")[1] || req.cookies.access_token;

    if (!access_token) {
      return next(
        res.status(401).json({
          success: false,
          message: "Please login to access this resource",
        })
      );
    }

    try {
      const secretKey = process.env.ACCESS_TOKEN || "";

      const decoded = jwt.verify(access_token, secretKey) as JwtPayload;

      if (!decoded) {
        return next(
          res.status(401).json({
            success: false,
            message: "Session expired, Please login!",
          })
        );
      }

      req.user = decoded;

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(
          res.status(401).json({
            success: false,
            message: "Session expired, Please login!",
          })
        );
      }

      return next(
        res.status(401).json({
          success: false,
          message: "Session expired, Please login!",
        })
      );
    }
  }
);
