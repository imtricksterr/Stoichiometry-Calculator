import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { PORT } from "./config/env.js";

import connectDB from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import calculationRouter from "./routes/calculation.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
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

export default app;
