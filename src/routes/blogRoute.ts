import express from "express";
import { Request, Response } from "express";
const router = express.Router();
import { createBlog, getBlog, getBlogById, deleteBlog } from "../controllers/blogController";

router.post("/create", createBlog);
router.get("/get/blogs", getBlog);
router.delete("/delete/:id", deleteBlog);
router.get("/get/:id", getBlogById);

router.use("*", (req: Request, res: Response) => {
  res.json({ message: "Route not found" });
})

export default router;