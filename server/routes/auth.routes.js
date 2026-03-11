import {
  loginController,
  meControllers,
} from "../controllers/auth.controllers.js";
import { checkToken } from "../middlewares/checkToken.js";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/login", loginController);

authRouter.get("/me", checkToken, meControllers);
