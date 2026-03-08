import { loginDal } from "../dal/login.dal.js";

export async function loginService(agentCode, password) {
  if (!agentCode) {
    throw new Error("agent code field missing");
  }
  if (!password) {
    throw new Error("password field missing");
  }
  if (typeof agentCode !== "string") {
    throw new Error("wrong type of agent code");
  }
  if (typeof password !== "string") {
    throw new Error("wrong type of password");
  }
  return await loginDal(agentCode, password);
}
