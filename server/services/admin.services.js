import { createUserDal } from "../dal/admin.dal.js";
import fs from "fs";

export async function createUserService(data) {
  const { agentCode, fullName, role, password } = data;
  if (!agentCode || !fullName || !role) {
    const error = new Error("some field are missing");
    error.status = 400;
    throw error;
  }
  if (role !== "agent" || role !== "agent") {
    throw new Error("invalid role");
  }
  if (!password) {
    data.password = fullName.split(" ").resvers().join("");
  }
  const reports = JSON.parse(await fs.promises.readFile("../data/agents.json"));
  const isAgent = reports.find((report) => report.agentCode === data.agentCode);
  if (isAgent) {
    const error = new Error("Agent with this agentCode already exist");
    error.status = 400;
    throw error;
  }
  return await createUserDal(data);
}
