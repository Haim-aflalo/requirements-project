import { loginController } from "../controllers/login.controllers.js";
import express from "express";

export const loginRouter = express.Router();

loginRouter.post("/auth/login", async (req, res) => {
  await loginController(req, res);
});
