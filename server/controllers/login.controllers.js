import { loginService } from "../services/login.services.js";

export async function loginController(req, res) {
  try {
    const { agentCode, password } = req.body;
    const agent = await loginService(agentCode, password);

    if (!agent) return res.status(401).send("unauthorized");

    const token = jwt.sign({ id: agent.id, role: agent.role }, "secret", {
      expiresIn: "1h",
    });

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
