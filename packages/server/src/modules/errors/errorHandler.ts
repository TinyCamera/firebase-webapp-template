import { Request, Response, NextFunction } from "express";
import { AppError } from "./customErrors";
import { isError } from "@firebase-webapp-template/shared";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.error(err);

  // Handle AppError instances
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }

  // Handle Firebase Auth errors
  if (err.name === "FirebaseAuthError") {
    return res.status(401).json({
      success: false,
      error: {
        code: "AUTHENTICATION_ERROR",
        message: "Authentication failed",
      },
    });
  }

  // Handle Firebase Admin errors
  if (err.name === "FirebaseError") {
    return res.status(500).json({
      success: false,
      error: {
        code: "FIREBASE_ERROR",
        message: "Internal server error",
      },
    });
  }

  // Handle all other errors
  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: isError(err) ? err.message : "An unexpected error occurred",
    },
  });
}
