import {
  loginController,
  meControllers,
} from "../controllers/auth.controllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  await loginController(req, res);
});

authRouter.get("/me", checkAuth(["admin", "agent"]), async (req, res) => {
  await meControllers(req, res);
});
