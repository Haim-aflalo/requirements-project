import { postReportDal } from "../dal/reports.dal.js";

export async function postReportService(data) {
  const { message, category, urgency } = data;

  if (!message || !category || !urgency) {
    const error = new Error("missing required fields");
    error.status = 400;
    throw error;
  }
  return await postReportDal(data);
}
