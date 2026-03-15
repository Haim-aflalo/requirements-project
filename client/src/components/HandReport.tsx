import React, { useState } from "react";
import axios from "axios";
import Back from "./Back";
import "../styles/HandReport.css";

function HandReport() {
  const [category, setCategory] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [sent, setSent] = useState<boolean>(false);
  async function addHandReport(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("urgency", urgency);
      formData.append("message", message);
      if (file) formData.append("image", file);
      await axios.post("http://localhost:3000/reports", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSent(true);
    } catch (error) {
      console.error("Post Failed:", error);
    }
  }
  return (
    <div className="hand-page">
      <h1 className="title">Add Hand Report</h1>
      <form className="report-form" onSubmit={addHandReport}>
        <select
          name="category"
          id="category"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        >
          <option value="">Choose Category</option>
          <option value="intelligence">intelligence</option>
          <option value="logistics">logistics</option>
          <option value="alert">alert</option>
        </select>
        <select
          name="urgency"
          id="urgency"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setUrgency(e.target.value)
          }
        >
          <option value="">Choose Level</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <textarea
          name="message"
          id="message"
          placeholder="your report"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
        ></textarea>
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
      {sent && <div className="success">Report Sent Successfully ✅</div>}
      <Back />
    </div>
  );
}

export default HandReport;
