import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "../state/AuthState";

interface Report {
  id: string;
  userId: string;
  category: string;
  urgency: string;
  message: string;
  sourceType: string;
  createdAt: string;
  imagePath?: string;
}

function MyReports() {
  const [category, setCategory] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [agentCode, setAgentCode] = useState<string>("");
  const [reports, setReports] = useState<Report[]>([]);
  const role = useAuthState((state) => state.role);

  async function fetchReportsWithFilter() {
    try {
      const params: any = {};
      if (category) {
        params.category = category;
      }
      if (urgency) {
        params.urgency = urgency;
      }
      if (agentCode) {
        params.agentCode = agentCode;
      }
      const response = await axios.get("http://localhost:3000/reports", {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(role);
      setReports(response.data.reports);
    } catch (error) {
      console.error("Fetch Failed", error);
    }
  }
  useEffect(() => {
    fetchReportsWithFilter();
  }, [category, urgency, agentCode]);

  return (
    <div className="reports-page">
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="intelligence">intelligence</option>
          <option value="logistics">logistics</option>
          <option value="alert">alert</option>
        </select>

        <select onChange={(e) => setUrgency(e.target.value)}>
          <option value="">Urgency</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        {role === "admin" && (
          <input
            type="text"
            placeholder="Agent Code"
            onChange={(e) => setAgentCode(e.target.value)}
          />
        )}
      </div>

      <div className="reports-table">
        <div className="table-header">
          <div>User</div>
          <div>Category</div>
          <div>Urgency</div>
          <div>Message</div>
          <div>Source</div>
          <div>Image</div>
        </div>

        {reports.map((report) => (
          <div className="table-row" key={report.id}>
            <div>{report.userId}</div>
            <div>{report.category}</div>
            <div>{report.urgency}</div>
            <div>{report.message}</div>
            <div>{report.sourceType}</div>
            <div>
              {report.imagePath ? (
                <img src={report.imagePath} alt="report" />
              ) : (
                "-"
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReports;
