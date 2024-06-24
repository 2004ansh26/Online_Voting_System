import { Router } from "express";
import multer from "multer";
import XLSX from "xlsx";
import { User } from "../../entity/User";

const router = Router();

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file"); // Specify the field name as "file"

// Route to handle file upload
router.post("/insertuser", upload, async (req, res) => {
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
            const user = new User();
            user.name = (row as { name: string }).name;
            user.citizenshipNumber = (row as { citizenshipNumber: string }).citizenshipNumber;
            user.email = (row as { email: string }).email;
            user.password = (row as { password: string }).password;
            user.admin = (row as { admin: boolean }).admin;
            user.verified = (row as { verified?: boolean }).verified || false; // Default value for verified
            // Logic to save user to database or perform any other operations
            await user.save();
        }
        
        return res.status(200).send("Data added successfully");
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).send("Internal server error");
    }
});

export default router;