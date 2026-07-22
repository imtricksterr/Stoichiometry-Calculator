import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/me", authorize, getUser);

userRouter.put("/me", authorize, updateUser);

userRouter.delete("/me", authorize, deleteUser);

export default userRouter;
