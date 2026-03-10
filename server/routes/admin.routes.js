import express from "express";
import {
  createUserController,
  getAllAgentsController,
} from "../controllers/admin.controllers.js";
import { checkAuth } from "../middlewares/checkAuth.js";

export const adminRouter = express.Router();

adminRouter.post("/users", checkAuth(["admin"]), async (req, res) => {
  createUserController(req, res);
});

adminRouter.get("/users", checkAuth(["admin"]), async (req, res) => {
  getAllAgentsController;
});
