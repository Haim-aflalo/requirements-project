import AgentDashboard from "../components/AgentDashboard";
import AdminDashboard from "../components/AdminDashboard";
import Back from "../components/Back";
import "../styles/Dashboard.css";

function AdminDashboardPage() {
  return (
    <div className="dashboard">
      <h1 className="title">Welcome To The Admin Page</h1>
      <div className="buttons">
        <AgentDashboard />
        <AdminDashboard />
      </div>
      <Back />
    </div>
  );
}

export default AdminDashboardPage;
