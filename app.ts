import express, { NextFunction, Request, Response } from "express";
export const app = express();
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { JwtPayload } from "jsonwebtoken";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import bookRouter from "./routes/book.routes";
import transactionRouter from "./routes/transaction.routes";

// Swagger related imports
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

// Define the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Swagger Definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Trackier Assignment Backend',
    version: '1.0.0',
    description: 'API documentation for the Inhouse Book Management System',
  },
  servers: [
    {
      url: 'https://bookworm-backend-4804.onrender.com/api/v1',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

// Swagger UI route
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("/api/v1", bookRouter);
app.use("/api/v1", transactionRouter);

// test api
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
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
