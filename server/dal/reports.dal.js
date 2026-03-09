import fs from "fs";

export async function postReportDal(data) {
  const reports = JSON.parse(
    await fs.promises.readFile("./data/reports.json", "utf-8"),
  );
  reports.push(data);
  await fs.promises.writeFile(
    "./data/reports.json",
    JSON.stringify(reports, null, 2),
  );
  return data;
}
