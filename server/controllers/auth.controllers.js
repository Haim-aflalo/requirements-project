import { loginService } from "../services/auth.services.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import fs from "fs";

export async function loginController(req, res) {
  try {
    const { agentCode, password } = req.body;
    const agent = await loginService(agentCode, password);
    if (!agent) return res.status(401).send("unauthorized");
    const token = jwt.sign(
      { agentCode: agent.agentCode, role: agent.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.status(200).json({
      token,
      user: {
        id: agent.id,
        agentCode: agent.agentCode,
        fullname: agent.fullName,
        role: agent.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function meControllers(req, res) {
  try {
    const decoded = req.user;
    const agents = JSON.parse(
      await fs.promises.readFile("./data/agents.json", "utf-8"),
    );
    const agent = agents.find(
      (agent) => agent.agentCode === decoded.agentCode && agent.role === decoded.role,
    );
    if (!agent) return res.status(404).send("User not found");
    res.status(200).json({
      user: {
        id: agent.id,
        agentCode: agent.agentCode,
        fullName: agent.fullName,
        role: agent.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
