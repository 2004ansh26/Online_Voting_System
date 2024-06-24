// updateUser.ts

import { Request, Response } from "express";
import { User } from "../../entity/User";

export const updateUserHandler = async (req: Request, res: Response) => {
  const citizenshipNumber = req.params.citizenshipNumber; // Change to citizenshipNumber
  const { name, email } = req.body; // Remove citizenshipNumber from here

  try {
    // Find the user by citizenship number
    const user = await User.findOne({ where: { citizenshipNumber } });

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user properties if provided in request body
    if (name) user.name = name;
    if (email) user.email = email;

    // Save the updated user to the database
    await user.save();

    // Return success response with the updated user object
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    // Handle errors
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
