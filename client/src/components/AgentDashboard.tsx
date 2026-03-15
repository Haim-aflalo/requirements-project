import { useNavigate } from "react-router-dom";

function AgentDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <button className="button" onClick={() => navigate("/myreports")}>
        My Reports
      </button>

      <button className="button" onClick={() => navigate("/newhandreport")}>
        New Report
      </button>

      <button className="button" onClick={() => navigate("/newcsvreport")}>
        CSV Report
      </button>
    </>
  );
}

export default AgentDashboard;
