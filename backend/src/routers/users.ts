import { Router } from "express";
import notVerifiedController from "../controllers/users/not-verified";
import verifyController from "../controllers/users/verify";
import deleteController from "../controllers/users/delete";
import insertUserRouter from "../controllers/users/insertuser"; // Import the router instead of app
import { updateUserHandler } from "../controllers/users/updateuser"; // Import the handler function for updating user
import {  searchUserByCitizenshipNumber,getAllVerifiedUsers } from "../controllers/users/searchuser";
import { User } from "../entity/User";
const router = Router();
router.put("/update/:citizenshipNumber", updateUserHandler); // Route for updating user
router.get("/all", notVerifiedController);
router.post("/verify", verifyController);
router.delete("/delete/:id", deleteController);

// Use the insertUserRouter for the insertuser route
router.use("/insertuser", insertUserRouter);
// Define the search user route
router.get("/verified", getAllVerifiedUsers);
router.get("/search/:citizenshipNumber", searchUserByCitizenshipNumber);
export default router;
