import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AgentDashboardPage from "./pages/AgentDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import HandReportPage from "./pages/HandReportPage";
import CsvReportPage from "./pages/CsvReportPage";
import MyReportsPage from "./pages/MyReportsPage";
import AdminManagementPage from "./pages/AdminManagementPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} path="/"></Route>
          <Route
            element={<AgentDashboardPage />}
            path="/agentdashboard"
          ></Route>
          <Route
            element={<AdminDashboardPage />}
            path="/admindashboard"
          ></Route>
          <Route element={<HandReportPage />} path="/newhandreport"></Route>
          <Route element={<CsvReportPage />} path="/newcsvreport"></Route>
          <Route element={<MyReportsPage />} path="/myreports"></Route>
          <Route
            element={<AdminManagementPage />}
            path="/adminmanagement"
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
