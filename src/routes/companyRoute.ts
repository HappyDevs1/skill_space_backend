import express from "express";
import { Request, Response } from "express";
import { createCompany, getCompany, findCompany, getFeaturedCompany, editCompany, deleteCompany, loginCompany } from "../controllers/CompanyController";
const router = express.Router();

router.post("/create", createCompany);
router.get("/companies", getCompany);
router.get("/:id", findCompany);
router.get("/featured", getFeaturedCompany);
router.put("/:id/edit", editCompany);
router.delete("/:id/delete", deleteCompany);
router.post("/login", loginCompany);

router.use("/", (req: Request, res: Response) => {
  res.json({ message: "Company API" });
});

export default router;