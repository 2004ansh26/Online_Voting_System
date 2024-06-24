import { Router } from "express";
import insertCandidateRouter from "../controllers/candidate/insertcandidate";
import { deleteCandidateById, getAllCandidates, updateCandidate } from "../controllers/candidate/candidate-controller";
import { Candidate } from "../entity/Candidate";

const router = Router();

// Route to get all candidates
router.get("/all", getAllCandidates);

// Route to insert a new candidate
router.use("/insertCandidate", insertCandidateRouter);

// Route to update a candidate by ID
router.put("/update/:id", updateCandidate);

// Route to delete a candidate by ID
router.delete("/delete/:id", deleteCandidateById);

export default router;
