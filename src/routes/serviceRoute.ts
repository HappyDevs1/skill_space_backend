import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { createService, getAllServices, updateService, getServiceById, deleteService } from "../controllers/serviceController";

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Service API" });
})

router.post("/create", createService);
router.get("/services", getAllServices);
router.put("/edit", updateService);
router.get("/:id", getServiceById);
router.delete("/delete", deleteService);

export default router;