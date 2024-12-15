import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { createCompany, createFeaturedCompany, getCompany, findCompany, getFeaturedCompany, editCompany, deleteCompany, loginCompany } from "../controllers/CompanyController";
const router = express.Router();

// Ensure "public/img" directory exists
if (!fs.existsSync("public/img")) {
  fs.mkdirSync("public/img", { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("file"), createCompany);
router.post("/create-featured", upload.single("file"), createFeaturedCompany);
router.get("/companies", getCompany);
router.get("/featured", getFeaturedCompany);
router.get("/:id", findCompany);
router.put("/:id/edit", editCompany);
router.delete("/:id/delete", deleteCompany);
router.post("/login", loginCompany);

router.use("/", (req: Request, res: Response) => {
  res.json({ message: "Company API" });
});

export default router;