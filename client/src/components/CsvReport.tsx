import axios from "axios";
import { useState } from "react";

function CsvReport() {
  const [file, setFile] = useState<File>();
  async function addCsvReport(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      await axios.post("http://localhost:3000/reports/csv", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Post Failed", error);
    }
  }
  return (
    <div>
      <h2>Add Hand Report</h2>
      <form onSubmit={addCsvReport}>
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Add Report</button>
      </form>
    </div>
  );
}

export default CsvReport;
