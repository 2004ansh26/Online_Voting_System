import express, { Request, Response } from "express";
import multer from "multer";
import XLSX from "xlsx";
import { Candidate } from "../../entity/Candidate";
import { Poll } from "../../entity/Poll";

const router = express.Router();

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

// Route to handle file upload and candidate insertion
router.post("/insertCandidate", upload, async (req: Request, res: Response) => {
  try {
    // Check if file is present in request
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Parse Excel file
    const workbook = XLSX.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Insert data into database
    for (const row of data) {
      const candidate = new Candidate();
      candidate.name = (row as { name: string }).name;
      
      // Find the associated Poll entity based on the pollId from the Excel data
      const poll = await Poll.findOne({ id: (row as { pollId: number }).pollId });

      if (!poll) {
        console.error(`Poll not found for pollId ${(row as { pollId: number }).pollId}`);
        continue; // Skip this row if the Poll is not found
      }

      candidate.poll = poll; // Set the associated Poll instance

      // Save the candidate to the database
      await candidate.save();
    }

    return res.status(200).send("Candidates added successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).send("Internal server error");
  }
});

export default router;