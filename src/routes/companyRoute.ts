import express from "express";
import { Request, Response } from "express";
import { createCompany, createFeaturedCompany, getCompany, findCompany, getFeaturedCompany, editCompany, deleteCompany, loginCompany } from "../controllers/CompanyController";
const router = express.Router();

router.post("/create", createCompany);
router.post("/create-featured", createFeaturedCompany);
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