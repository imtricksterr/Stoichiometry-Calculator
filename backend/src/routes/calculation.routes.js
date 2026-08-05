import { Router } from "express";
import {
  deleteCalculation,
  getCalculation,
  getCalculations,
  createCalculation,
} from "../controllers/calculation.controller.js";

import {
  getMolarMass,
  getLimitingReagent,
  getPercentYield,
  getStoichiometry,
} from "../controllers/chemistry.controller.js";

import authorize from "../middlewares/auth.middleware.js";

const calculationRouter = Router();

// chemistry api routes
calculationRouter.post("/molar-mass", getMolarMass);
calculationRouter.post("/stoichiometry", getStoichiometry);
calculationRouter.post("/percent-yield", getPercentYield);
calculationRouter.post("/limiting-reagent", getLimitingReagent);

// calculation routes
calculationRouter.get("/:id", authorize, getCalculation);
calculationRouter.get("/", authorize, getCalculations);
calculationRouter.post("/", authorize, createCalculation);
calculationRouter.delete("/:id", authorize, deleteCalculation);

export default calculationRouter;
