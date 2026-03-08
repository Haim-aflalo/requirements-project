import express from "express";
import { meControllers } from "../controllers/me.controllers.js";
import { checkToken } from "../middlewares/checkToken.js";

export const meRouter = express.Router();

meRouter.get("/auth/me", checkToken, async (req, res) => {
  await meControllers(req, res);
});
