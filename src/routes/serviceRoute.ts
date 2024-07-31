import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { createService, getAllServices, updateService, getServiceById, deleteService } from "../controllers/serviceController";

router.post("/create", createService);
router.get("/services", getAllServices);
router.put("/:id/edit", updateService);
router.get("/:id", getServiceById);
router.delete("/:id/delete", deleteService);

router.use("/", (req: Request, res: Response) => {
  res.json({ message: "Service API" });
});

export default router;