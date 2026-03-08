import { loginDal } from "../dal/login.dal.js";

export async function meControllers(req, res) {
  console.log(1);

  try {
    const decoded = req.user;
    const agent = await loginDal(decoded.agentCode, decoded.password);
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
    res.status(500).send(error);
  }
}
