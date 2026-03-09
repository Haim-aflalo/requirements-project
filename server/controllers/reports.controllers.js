import { postReportService } from "../services/reports.services.js";

let currentId = 0;
export async function postReportsController(req, res) {
  try {
    const decoded = req.user;
    const { category, urgency, message, imagePath } = req.body;
    const report = {
      id: currentId++,
      userId: decoded.id,
      category,
      urgency,
      message,
      sourceType: "manual",
      createdAt: new Date().toISOString(),
    };
    if (req.file) {
      report.imagePath = req.file.path;
    }
    await postReportService(report);
    res.status(201).json({ report });
  } catch (error) {
    res.status(400).json({ error });
  }
}
