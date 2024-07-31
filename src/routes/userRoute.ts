import express from "express";
import { Request, Response } from "express";
import { createUser, getUsers, findUser, loginUser } from "../controllers/userController";
const router = express.Router();

router.post("/create", createUser);
router.get("/users", getUsers);
router.get("/:id", findUser);
router.post("/login", loginUser);

router.use("/", (req: Request, res: Response) => {
  res.json({ message: "User API" });
});

export default router;