import { loginDal } from "../dal/auth.dal.js";

export async function loginService(agentCode, password) {
  if (!agentCode || !password) {
    throw new Error("some field missing");
  }
  if (typeof agentCode !== "string" || typeof password !== "string") {
    throw new Error("wrong type of data");
  }
  return await loginDal(agentCode, password);
}
