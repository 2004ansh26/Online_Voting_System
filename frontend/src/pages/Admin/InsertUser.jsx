
import React, { useState } from "react";
import axios from "axios";

const InsertFile = () => {
  const [userFile, setUserFile] = useState(null);
  const [candidateFile, setCandidateFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUserFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUserFile(selectedFile);
    }
  };

  const handleCandidateFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCandidateFile(selectedFile);
    }
  };

  const handleUserFileUpload = async () => {
    if (!userFile) {
      console.log("No user file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", userFile);

    try {
      const response = await axios.post("http://localhost:8000/insertuser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading user file:", error);
    }
  };

  const handleCandidateFileUpload = async () => {
    if (!candidateFile) {
      console.log("No candidate file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", candidateFile);

    try {
      const response = await axios.post("http://localhost:8000/insertCandidate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading candidate file:", error);
    }
  };

  return (
    <div>
      <h3>Upload User's</h3>
      <input type="file" name="userFile" accept=".xlsx,.xls" onChange={handleUserFileChange} />
      <button onClick={handleUserFileUpload}>Upload File</button>
      <hr />

      {/* <h3>Upload Candidates</h3>
      <input
        type="file"
        name="candidateFile"
        accept=".xlsx,.xls"
        onChange={handleCandidateFileChange}
      />
      <button onClick={handleCandidateFileUpload}>Upload Candidate File</button>
      <hr /> */}

      {successMessage && (
        <div style={{ backgroundColor: "green", color: "white", padding: "10px" }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default InsertFile;