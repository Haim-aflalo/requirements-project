import { agentParse } from "../utils/agentParse.js";

export async function loginDal(agentCode, password) {
  const agents = await agentParse();
  return agents.find(
    (agent) => agent.agentCode === agentCode && agent.passwordHash === password,
  );
}


