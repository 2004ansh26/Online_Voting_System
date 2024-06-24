// backend/src/controllers/users.ts

import { Request, Response } from "express";
import { User } from "../../entity/User";

export const searchUserByCitizenshipNumber = async (req: Request, res: Response) => {
  const { citizenshipNumber } = req.params;

  try {
    const user = await User.findOne({ citizenshipNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      citizenshipNumber: user.citizenshipNumber,
      verified: user.verified, // Include verification status
    });
  } catch (error) {
    console.error("Error searching for user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllVerifiedUsers = async (req: Request, res: Response) => {
  try {
    // Find all users where verified is true
    const users = await User.find({ verified: true });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching verified users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

