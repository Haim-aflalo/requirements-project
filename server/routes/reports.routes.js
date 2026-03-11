import express from "express";
import { checkToken } from "../middlewares/checkToken.js";
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
  checkToken,
  uploadImage("image"),
  postReportsController,
);

reportsRouter.post(
  "/csv",
  checkToken,
  uploadImage("file"),
  reportsCsvControllers,
);

reportsRouter.get("/", checkToken, getReportsController);

reportsRouter.get("/:id", checkToken, getReportByIdController);
