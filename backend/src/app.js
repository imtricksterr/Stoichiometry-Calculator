import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { PORT, CLIENT_URL } from "./config/env.js";

import connectDB from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import calculationRouter from "./routes/calculation.routes.js";
import arcjet from "@arcjet/node";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.endsWith(".vercel.app") ||
        origin === "http://localhost:5173"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(arcjetMiddleware);
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/calculations", calculationRouter);

app.get("/", (req, res) => {
  res.send("Ratio API is running");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  await connectDB();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
