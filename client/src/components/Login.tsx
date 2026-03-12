import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../state/AuthState";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";
interface TokenPayload {
  role: string;
  agentCode: string;
}

export function Login() {
  const [agentCode, setAgentCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setRole = useAuthState((state) => state.setRole);
  const navigate = useNavigate();
  async function login(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        agentCode,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode<TokenPayload>(token);

      setRole(decoded.role);

      decoded.role === "agent"
        ? navigate("/agentdashboard")
        : navigate("/admindashboard");
    } catch (error) {
      console.error("Connection Failed:", error);
    }
  }

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={login}>
        <div className="input">
          <input
            className="id"
            type="text"
            placeholder="Agent Code"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAgentCode(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
