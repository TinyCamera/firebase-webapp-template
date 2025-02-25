import express from "express";
import * as functions from "firebase-functions";
import * as dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./modules/errors/errorHandler";
import todoRoutes from "./modules/todos/todoRoutes";
import { authMiddleware } from "./modules/auth/authMiddleware";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://your-firebase-project-id-24121.web.app",
    "http://localhost:5173", // Vite dev server
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use(authMiddleware);

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
