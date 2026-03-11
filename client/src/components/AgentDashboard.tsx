import { Link } from "react-router-dom";
function AgentDashboard() {
  return (
    <div>
      <Link to="/myreports">My Reports</Link>
      <Link to="/newhandreport">New Hand Reports</Link>
      <Link to="/newcsvreport">New Csv Reports</Link>
    </div>
  );
}

export default AgentDashboard;
