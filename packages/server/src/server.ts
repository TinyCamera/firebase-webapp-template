import express from "express";
import * as functions from "firebase-functions";
import * as dotenv from "dotenv";
import { errorHandler } from "./modules/errors/errorHandler";
import todoRoutes from "./modules/todos/todoRoutes";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// API routes
app.use("/v1/todos", todoRoutes);

// Error handling - must be last middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);
