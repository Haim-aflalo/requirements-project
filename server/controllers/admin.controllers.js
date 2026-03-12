import { getAllAgentsDal } from "../dal/admin.dal.js";
import { createUserService } from "../services/admin.services.js";
export async function createUserController(req, res) {
  try {
    const { agentCode, fullName, role, password } = req.body;
    const newAgent = {
      id: new Date(),
      agentCode,
      fullName,
      role,
      passwordHash: password,
      createdAt: new Date().toLocaleString(),
    };
    await createUserService(newAgent);
    res.status(201).json({ user: newAgent });
  } catch (error) {
    res.json({ error: error.message });
  }
}

export async function getAllAgentsController(req, res) {
  try {
    const agents = await getAllAgentsDal();
    res.status(200).json({ users: agents });
  } catch (error) {
    res.json({ erro: error.message });
  }
}
