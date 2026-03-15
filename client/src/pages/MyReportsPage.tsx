import MyReports from "../components/MyReports";
import Back from "../components/Back";
import "../styles/MyReports.css";
function MyReportsPage() {
  return (
    <div className="reports-page">
      <MyReports />
      <Back></Back>
    </div>
  );
}

export default MyReportsPage;
