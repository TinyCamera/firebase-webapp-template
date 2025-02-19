import { Request, Response, NextFunction } from "express";
import { auth } from "../../firebase";
import { AuthenticationError } from "../errors/customErrors";
import { User } from "@firebase-webapp-template/shared";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AuthenticationError();
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    // Add user to request object
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email || "",
      displayName: decodedToken.name,
      photoURL: decodedToken.picture,
    };

    next();
  } catch (error) {
    next(new AuthenticationError());
  }
}
