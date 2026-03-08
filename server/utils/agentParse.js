import fs from "fs";

export async function agentParse() {
  const data = await fs.promises.readFile("./data/agents.csv", "utf-8");
  const agentsData = data.split("\n").slice(1);
  return agentsData
    .filter((agent) => agent)
    .map((agent) => {
      const [id, agentCode, fullName, passwordHash, role, createdAt] =
        agent.split(",");
      return { id, agentCode, fullName, passwordHash, role, createdAt };
    });
}

