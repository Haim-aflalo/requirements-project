import express from "express";
import {
  createUserController,
  getAllAgentsController,
} from "../controllers/admin.controllers.js";
import { checkToken } from "../middlewares/checkToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

export const adminRouter = express.Router();

adminRouter.post("/users", checkToken, isAdmin, createUserController);

adminRouter.get("/users", checkToken, isAdmin, getAllAgentsController);
