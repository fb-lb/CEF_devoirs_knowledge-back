import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { connectDB } from "./config/database.js";
import { router as indexRouter } from "./routes/index.js";
import { router as usersRouter } from "./routes/users.js";
import { AppError } from "./utils/AppError.js";
import { ApiResponse } from "./types/Interfaces.js";
import { setupAssociations } from "./models/databaseAssociations.js";

// Set Database
await connectDB();
setupAssociations()

// Get public folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------
// Express configuration
// -----------------------
const app = express();

// Allow the FRONT_URL only to read responses from the backend
app.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: false,
    allowedHeaders: ['Authorization', 'Content-Type'],
    exposedHeaders: ['Authorization'],
  })
);

// CSRF protection
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  const allowed = process.env.FRONT_URL;
  const method = req.method;

  if (origin !== allowed && method !== 'GET') {
    return res.status(403).json({
      success: false,
      message: "Request not authorized, CSRF detected",
    });
  }

  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 error management
app.use(function (req: Request, res: Response, next: NextFunction): void {
  res.status(404).json({
    error: "Not found",
    message: `La route ${req.originalUrl} n'existe pas.`,
  });
});

// Error management
app.use(function (err: unknown, req: Request, res: Response, next: NextFunction): Response<ApiResponse> {
  let status = 500;
  let message = "Une erreur interne au serveur est survenue. Veuillez nous excuser pour la gène occasionnée. Nous mettons tout en oeuvre pour corriger le problème.";
  
  if (err instanceof AppError) {
    status = err.status;
    message = err.messageFront;
    console.error({
      status: err.status,
      name: err.name,
      message: err.message,
      stack: err.stack,
      cause: err.cause
    });
  } else if (err instanceof Error) {
    console.error({
      name: err.name,
      message: err.message,
      stack: err.stack,
      cause: err.cause
    });
  } else {
    console.error(err);
  }

  // add external service like Sentry to save the error

  return res.status(status).json({
    success: false,
    message: message,
  });
});

export default app;