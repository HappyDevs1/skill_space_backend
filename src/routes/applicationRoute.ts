import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { getAllApplication, getApplicationById, editApplication, deleteApplication, createApplication, downloadCv } from "../controllers/applicationController";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure "public/img" directory exists
if (!fs.existsSync("public/doc")) {
  fs.mkdirSync("public/doc", { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/doc");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// router.post("/create", upload.single("file"), createApplication);
router.get("/applications", getAllApplication);
router.post("/:id/upload", upload.single("file"), createApplication );
router.get("/:id/download/cv", downloadCv);
router.get("/:id", getApplicationById);
router.put("/:id/edit", editApplication);
router.delete("/:id/delete", deleteApplication);

router.use("*" , (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;