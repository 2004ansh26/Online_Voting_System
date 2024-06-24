import { Request, Response } from "express";
import { Candidate } from "../../entity/Candidate"; // Import the Candidate entity
import * as yup from "yup";

const schema = yup.object({
  body: yup.object({
    candidateId: yup.number().integer().required(), // Adjust for candidate ID
  }),
});

export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  try {
    const candidate = await Candidate.findOneOrFail(req.body.candidateId); // Find candidate by ID
    // Perform any verification logic needed for candidates
    return res.send({ candidate });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return res.status(400).send({ error });
  }
};
