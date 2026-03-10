import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { uploadImage } from "../middlewares/upload.js";
import {
  postReportsController,
  reportsCsvControllers,
  getReportsController,
  getReportByIdController,
} from "../controllers/reports.controllers.js";

export const reportsRouter = express.Router();

reportsRouter.post(
  "/",
  checkAuth(["admin", "agent"]),
  uploadImage("image"),
  async (req, res) => {
    await postReportsController(req, res);
  },
);

reportsRouter.post(
  "/csv",
  checkAuth(["admin", "agent"]),
  uploadImage("file"),
  async (req, res) => {
    await reportsCsvControllers(req, res);
  },
);

reportsRouter.get("/", checkAuth(["admin", "agent"]), async (req, res) => {
  await getReportsController(req, res);
});
reportsRouter.get("/:id", checkAuth(["admin", "agent"]), async (req, res) => {
  await getReportByIdController(req, res);
});
