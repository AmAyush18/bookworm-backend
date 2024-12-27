import express, { NextFunction, Request, Response } from "express";
export const app = express();
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { JwtPayload } from "jsonwebtoken";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";


dotenv.config();

// Define the Request interface
declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload;
      }
    }
  }

// body parser
app.use(express.json({ limit: "1mb" }));

// cookie parser
app.use(cookieParser());

// cors
app.use(
    cors({
    origin: process.env.ORIGIN?.split(","),
    credentials: true,
    })
);

// routes
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);


// test api
app.get("/api/v1/test", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        success: true,
        message: "API is working",
      });
    } catch (error) {
      next(error);
    }
  });
  
  // unknown routes
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});