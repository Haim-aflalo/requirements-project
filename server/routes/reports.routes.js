import express from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { uploadImage } from "../middlewares/upload.js";
import {
  postReportsController,
  reportsCsvControllers,
} from "../controllers/reports.controllers.js";


export const reportsRouter = express.Router();

reportsRouter.post("/", checkToken, uploadImage("image"), async (req, res) => {
  await postReportsController(req, res);
});

reportsRouter.post(
  "/csv",
  checkToken,
  uploadImage("file"),
  async (req, res) => {
    await reportsCsvControllers(req, res);
  },
);
