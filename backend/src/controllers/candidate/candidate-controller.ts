import { Request, Response } from "express";
import { Candidate } from "../../entity/Candidate";

// Function to get all candidates
export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).send("Internal server error");
  }
};

// Function to update a candidate by ID
export const updateCandidate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, poll } = req.body; // Adjust here
  try {
    const candidate = await Candidate.findOne(id);
    if (!candidate) {
      return res.status(404).send("Candidate not found");
    }
    candidate.name = name;
    candidate.poll = poll; // Adjust here
    await candidate.save();
    res.json(candidate);
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).send("Internal server error");
  }
};

// Function to delete a candidate by ID
export const deleteCandidateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Candidate.delete(id);
    res.send("Candidate deleted successfully");
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).send("Internal server error");
  }
};
