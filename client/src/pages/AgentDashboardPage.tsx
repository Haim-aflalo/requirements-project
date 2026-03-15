import AgentDashboard from "../components/AgentDashboard";
import Back from "../components/Back";
import "../styles/Dashboard.css";

function AgentDashboardPage() {
  return (
    <div className="dashboard">
      <h1 className="title">Welcome To The Agent Page</h1>
      <div className="buttons">
        <AgentDashboard />
      </div>
      <Back />
    </div>
  );
}

export default AgentDashboardPage;
