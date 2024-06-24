import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Chart from "../../components/Polls/Chart";
import Panel from "../../components/Polls/Panel";
import Running from "../../components/Polls/Running";

const Polls = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "", votes: {} });
  const [timeout, setTimeout] = useState(null);
  const [electionStatus, setElectionStatus] = useState(null);

  useEffect(() => {
    axios.get("/polls/").then((res) => {
      setData(res.data);
      setLoading(false);
    });

    axios.get("/polls/status").then((res) => {
      setTimeout(res.data.timeout);
    });
  }, []);

  const endElection = () => {
    axios
      .post("/polls/end")
      .then((_) => window.location.reload())
      .catch((err) => console.log({ err }));
  };

  if (loading) return <div></div>;

  return (
    <Panel
      name={data.name}
      description={data.description}
      timeout={timeout} // Pass the timeout value as a prop
    >
      <>
      <Running /> 
      {electionStatus === "ended" ? (
          <div>Election has ended.</div>
        ) : (
          <>
            <Chart votes={data.votes} />

            <button
              onClick={endElection}
              className="end-election-button button-primary"
            >
              End Election
            </button>
          </>
        )}
      </>
    </Panel>
  );
};

export default Polls;
