import { Request, Response } from "express";
import * as yup from "yup";
import ElectionContract, { web3 } from "../../web3";
import { Candidate } from "../../entity/Candidate"; // Import Candidate entity from TypeORM
import memoryCache from "memory-cache";

const schema = yup.object({
  body: yup.object({
    name: yup.string().min(3).required(),
    description: yup.string().min(10).required(),
    candidates: yup.array(
      yup.object({
        name: yup.string().min(3),
        info: yup.string().min(10),
      })
    ).required(),
    timeout: yup.number().positive().required(), // Add timeout validation
  }).required(),
});

export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  const { name, description, candidates, timeout } = req.body; // Extract timeout
  const instance = await ElectionContract.deployed();

  const status = await instance.getStatus();
  if (status !== "not-started") {
    return res.status(400).send("election already started or not reset");
  }

  const accounts = await web3.eth.getAccounts();

  await instance.setElectionDetails(name, description, {
    from: accounts[0],
  });

  // Save candidates data in the database
  for (const candidate of candidates) {
    const newCandidate = new Candidate();
    newCandidate.name = candidate.name;
    // newCandidate.info = candidate.info; // Ensure the info is saved
    try {
      await newCandidate.save();
    } catch (error) {
      console.error("Error saving candidate:", error);
    }

    await instance.addCandidate(candidate.name, candidate.info, {
      from: accounts[0],
    });
  }

  // Set timeout for ending election
  setTimeout(async () => {
    const status = await instance.getStatus();
    if (status === "running") {
      await instance.endElection({ from: accounts[0] });
      memoryCache.clear();
      console.log("Election ended due to timeout.");
    }
  }, timeout * 60 * 1000); // Convert timeout from minutes to milliseconds

  return res.send(req.body);
};

export const getElectionStatus = async (req: Request, res: Response) => {
  const instance = await ElectionContract.deployed();
  const status = await instance.getStatus();
  const startTime = memoryCache.get("electionStartTime");
  const timeout = memoryCache.get("electionTimeout");

  return res.json({ status, startTime, timeout });
};