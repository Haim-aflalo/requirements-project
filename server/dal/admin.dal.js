import fs from "fs";

export async function createUserDal(data) {
  const agents = JSON.parse(
    await fs.promises.readFile("./data/agents.json", "utf-8"),
  );
  agents.push(data);
  await fs.promises.writeFile(
    "./data/agents.json",
    JSON.stringify(agents, null, 2),
  );
}

export async function getAllAgentsDal() {
  return JSON.parse(await fs.promises.readFile("./data/agents.json", "utf-8"));
}
