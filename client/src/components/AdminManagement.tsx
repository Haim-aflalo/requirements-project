import axios from "axios";
import React, { useState } from "react";
interface Agent {
  id: string;
  agentCode: string;
  fullName: string;
  passwordHash: string;
  role: string;
}
function AdminManagement() {
  const [agentsFlag, setAgentsFlag] = useState<boolean>(false);
  const [passwordFlag, setPasswordFlag] = useState<boolean>(false);
  const [agents, setAgents] = useState<Agent[]>();
  const [agentCode, setAgentCode] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
            

  async function fetchAgents(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    try {
      setAgentsFlag(true);
      const response = await axios.get("http://localhost:3000/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAgents(response.data.users);
    } catch (error) {
      console.error("Fetch Failed", error);
    }
  }


  async function createAgent(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/users",
        { agentCode, fullName, role, password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error("Post Failed", error);
    }
  }

  return (
    <>
      <form onSubmit={createAgent}>
        <input
          type="text"
          placeholder="agent code"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAgentCode(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="full name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFullName(e.target.value)
          }
        />
        <select
          name="role"
          id="role"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setRole(e.target.value)
          }
        >
          <option value="">Add Role</option>
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
        </select>
        <button type="button" onClick={() => setPasswordFlag((prev) => !prev)}>
          {passwordFlag ? "Without" : "Add password"}
        </button>
        {passwordFlag && (
          <input
            type="text"
            placeholder="Add a password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        )}
        <button type="submit">Create Agent</button>
      </form>
      <button onClick={fetchAgents}>Get All Agents</button>
      {agentsFlag && (
        <section className="all-agents">
          <h3>All Agents</h3>
          <ul>
            {agents?.map((agent) => (
              <li key={agent.id}>
                <div>
                  <strong>Agent Code:</strong>
                  {agent.agentCode}
                </div>
                <div>
                  <strong>Full Name:</strong>
                  {agent.fullName}
                </div>
                <div>
                  <strong>Password:</strong>
                  {agent.passwordHash}
                </div>
                <div>
                  <strong>Role:</strong>
                  {agent.role}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default AdminManagement;
