import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <button className="button" onClick={() => navigate("/adminmanagement")}>
      Admin Management
    </button>
  );
}

export default AdminDashboard;
