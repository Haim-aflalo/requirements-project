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
    <>
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
          placeholder="filter by agentCode"
          onChange={(e) => setAgentCode(e.target.value)}
        />
      )}
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <div>
              <strong>User Id:</strong>
              {report.userId}
            </div>
            <div>
              <strong>Category:</strong>
              {report.category}
            </div>
            <div>
              <strong>Urgency:</strong>
              {report.urgency}
            </div>
            <div>
              <strong>Message:</strong>
              {report.message}
            </div>
            <div>
              <strong>Source:</strong>
              {report.sourceType}
            </div>
            {report.imagePath && (
              <div>
                <strong>Image Path:</strong>
                {report.imagePath}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MyReports;
