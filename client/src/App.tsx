import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AgentDashboardPage from "./pages/AgentDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import HandReportPage from "./pages/HandReportPage";
import CsvReportPage from "./pages/CsvReportPage";
import MyReportsPage from "./pages/MyReportsPage";
import AdminManagementPage from "./pages/AdminManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/agentdashboard" element={<AgentDashboardPage />} />
            <Route path="/myreports" element={<MyReportsPage />} />
            <Route path="/newhandreport" element={<HandReportPage />} />
            <Route path="/newcsvreport" element={<CsvReportPage />} />
          </Route>

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admindashboard" element={<AdminDashboardPage />} />
            <Route path="/adminmanagement" element={<AdminManagementPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
