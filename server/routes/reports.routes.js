import express from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { uploadImage } from "../middlewares/upload.js";
import { postReportsController } from "../controllers/reports.controller.js";

export const reportsRouter = express.Router();

reportsRouter.post("/", checkToken, uploadImage, async (req, res) => {
  await postReportsController(req, res);
});
