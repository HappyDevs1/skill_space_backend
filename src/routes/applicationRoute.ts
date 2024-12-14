import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { getAllApplication, getApplicationById, editApplication, deleteApplication, createApplication } from "../controllers/applicationController";
import multer from "multer";
import path from "path";
import fs from "fs";

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

router.post("/upload", upload.single("file"), createApplication );
// router.post("/create", upload.single("file"), createApplication);
router.get("/applications", getAllApplication);
router.get("/:id", getApplicationById);
router.put("/:id/edit", editApplication);
router.delete("/:id/delete", deleteApplication);

router.use("*" , (req: Request, res: Response) => {
  res.status(200).json({ message: "Application API" });
});

export default router;