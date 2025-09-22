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

// Database connection test
await connectDB();

// Get public folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------
// Express configuration
// -----------------------
const app = express();

// Authorize front-end url to make request to the back-end
app.use(
  cors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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

// 500 error management
app.use(function (err: AppError, req: Request, res: Response, next: NextFunction): void {
  console.log(err);
  res.status(err.status || 500).json({
    error: err.name || "InternalServerError",
    message:
      process.env.NODE_ENV === "development"
        ? err.message || "Une erreur est survenu sur le serveur."
        : "Une erreur est survenu sur le serveur.",
  });
});

export default app;
