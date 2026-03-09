import { postReportService } from "../services/reports.services.js";
import fs from "fs";

let currentId = 1;
export async function postReportsController(req, res) {
  try {
    const decoded = req.user;
    const { category, urgency, message } = req.body;
    const report = {
      id: currentId++,
      userId: decoded.id,
      category,
      urgency,
      message,
      sourceType: "manual",
    };
    if (req.file) {
      report.imagePath = req.file.path;
    }
    ((report.createdAt = new Date().toISOString()),
      await postReportService(report));
    res.status(201).json({ report });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function reportsCsvControllers(req, res) {
  try {
    const decoded = req.user;
    const filePath = req.file.path;
    const content = await fs.promises.readFile(filePath, "utf-8");
    const rows = content
      .split("\n")
      .slice(1)
      .filter((r) => r.trim() !== "");
    const reports = [];
    for (const row of rows) {
      const [category, urgency, message] = row.split(",");
      const report = {
        id: currentId++,
        userId: decoded.id,
        category,
        urgency,
        message,
        sourceType: "csv",
        createdAt: new Date().toISOString(),
      };

      await postReportService(report);
      reports.push(report);
    }
    res.status(201).json({
      importedCount: reports.length,
      reports: reports,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
