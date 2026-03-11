import {
  postReportService,
  getReportService,
  getReportByIdService,
} from "../services/reports.services.js";
import fs from "fs";

export async function postReportsController(req, res) {
  try {
    const decoded = req.user;
    const { category, urgency, message } = req.body;
    const report = {
      id: Math.random().toString(36).substring(2, 9),
      userId: decoded.agentCode,
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
        id: Math.random().toString(36).substring(2, 9),
        userId: decoded.agentCode,
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

export async function getReportsController(req, res) {
  try {
    const params = req.query;
    const decoded = req.user;
    const role = decoded.role;
    const agentCode = decoded.agentCode;
    const reports = await getReportService(params, role, agentCode);
    res.status(200).json({ reports });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getReportByIdController(req, res) {
  try {
    const reportId = req.params.id;
    const decoded = req.user;
    const role = decoded.role;
    const userId = decoded.agentCode;
    const reports = await getReportByIdService(reportId, role, userId);
    res.status(200).json({ reports });
  } catch (error) {
    res.json({ error: error.message });
  }
}
