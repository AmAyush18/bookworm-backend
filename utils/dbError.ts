import ErrorHandler from "./ErrorHandler";

export const handleDatabaseConnectionError = (error: any) => {
  console.error("Database connection error:", error);
  throw new ErrorHandler("Internal Server Error", 500);
};
