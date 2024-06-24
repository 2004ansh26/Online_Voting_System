// ManageCandidate.jsx

import React, { useState, useEffect } from "react";
import axios from "../../axios";

const ManageCandidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [newCandidateName, setNewCandidateName] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    axios.get("/candidates")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  };

  const addCandidate = () => {
    axios.post("/candidates", { name: newCandidateName })
      .then((response) => {
        console.log("Candidate added successfully:", response.data);
        fetchCandidates();
        setNewCandidateName("");
      })
      .catch((error) => {
        console.error("Error adding candidate:", error);
      });
  };

  const deleteCandidate = (id) => {
    axios.delete(`/candidates/${id}`)
      .then((response) => {
        console.log("Candidate deleted successfully:", response.data);
        fetchCandidates();
      })
      .catch((error) => {
        console.error("Error deleting candidate:", error);
      });
  };

  return (
    <div>
      <h2>Manage Candidates</h2>
      <div>
        <input type="text" value={newCandidateName} onChange={(e) => setNewCandidateName(e.target.value)} />
        <button onClick={addCandidate}>Add Candidate</button>
      </div>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name}
            <button onClick={() => deleteCandidate(candidate.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCandidate;
