import { Router } from "express";
import {
  deleteCalculation,
  getCalculation,
  getCalculations,
  createCalculation,
} from "../controllers/calculation.controller.js";

import authorize from "../middlewares/auth.middleware.js";

const calculationRouter = Router();

calculationRouter.get("/:id", authorize, getCalculation);

calculationRouter.get("/", authorize, getCalculations);

calculationRouter.post("/", authorize, createCalculation);

calculationRouter.delete("/:id", authorize, deleteCalculation);

export default calculationRouter;
