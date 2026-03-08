import fs from "fs";

export async function loginDal(agentCode, password) {
  const agents = JSON.parse(
    await fs.promises.readFile("./data/agents.json", "utf-8"),
  );
  return agents.find(
    (agent) => agent.agentCode === agentCode && agent.passwordHash === password,
  );
}
