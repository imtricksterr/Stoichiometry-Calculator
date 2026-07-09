import { Router } from "express";

const calculationRouter = Router();

calculationRouter.post("/", (req, res) =>
  res.send({ title: "CREATES new calculation" }),
);

calculationRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATES calculation" }),
);

calculationRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETES calculation" }),
);

export default calculationRouter;
