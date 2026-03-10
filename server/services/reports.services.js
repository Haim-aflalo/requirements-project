import { getReportsDal, postReportDal } from "../dal/reports.dal.js";

export async function postReportService(data) {
  const { category, message, urgency } = data;
  if (!message || !category || !urgency) {
    const error = new Error("missing required fields");
    error.status = 400;
    throw error;
  }
  return await postReportDal(data);
}

export async function getReportService(params, role, agentCode) {
  let reports = await getReportsDal();
  if (role === "agent") {
    reports = reports.filter((report) => report.userId === agentCode);
  }
  if (params.category) {
    reports = reports.filter((report) => report.category === params.category);
  }
  if (params.message) {
    reports = reports.filter((report) => report.message === params.message);
  }
  if (params.urgency) {
    reports = reports.filter((report) => report.urgency === params.urgency);
  }
  return reports;
}

export async function getReportByIdService(reportId, role, userId) {
  let reports = await getReportsDal();
  const report = reports.find((report) => report.id == reportId);
  if (!report) {
    const error = new Error("Report Not Found");
    error.status = 404;
    throw error;
  }
  if (role === "agent" && report.userId !== userId) {
    const error = new Error("Unauthorized");
    error.status = 403;
    throw error;
  }
  return report;
}
