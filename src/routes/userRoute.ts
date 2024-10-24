import express from "express";
import { Request, Response } from "express";
import { createUser, getUsers, findUser, getFeaturedUser, loginUser, editUser, deleteUser } from "../controllers/userController";
const router = express.Router();

router.post("/create", createUser);
router.get("/users", getUsers);
router.get("/:id", findUser);
router.get("/featured", getFeaturedUser);
router.put("/:id/edit", editUser);
router.delete("/:id/delete", deleteUser);
router.post("/login", loginUser);

router.use("/", (req: Request, res: Response) => {
  res.json({ message: "User API" });
});

export default router;