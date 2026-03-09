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

export async function getReportsDal(params, auth) {
  const reports = JSON.parse(
    await fs.promises.readFile("./data/reports.json", "utf-8"),
  );
  if (auth) {
    return reports.filter((report) => {
      report.params.key === params.value;
    });
  }
  return reports;
}
