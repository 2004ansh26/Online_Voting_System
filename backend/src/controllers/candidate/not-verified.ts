import { Request, Response } from "express";
import { Candidate } from "../../entity/Candidate"; // Import the Candidate entity

export default async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find(); // Retrieve all candidates
    return res.send({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return res.status(500).send("Internal server error");
  }
};
