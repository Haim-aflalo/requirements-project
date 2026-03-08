import { loginService } from "../services/login.services.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function loginController(req, res) {
  try {
    const { agentCode, password } = req.body;
    const agent = await loginService(agentCode, password);
    if (!agent) return res.status(401).send("unauthorized");
    const token = jwt.sign(
      { agentCode: agent.agentCode, password: agent.passwordHash },
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
    res.status(400).send(error);
  }
}
