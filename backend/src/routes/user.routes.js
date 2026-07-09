import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

// add admin get users later
userRouter.post("/", (req, res) => res.send({ title: "CREATES new user" }));

userRouter.put("/:id", (req, res) => res.send({ title: "UPDATES user" }));

userRouter.delete("/:id", (req, res) => res.send({ title: "DELETES user" }));

export default userRouter;
