import express from "express";
import { Request, Response, NextFunction } from "express";
import { createUser, findUser, loginUser } from "../controllers/userController";
const router = express.Router();

router.use("/user");

router.post("/create", createUser);
router.get("/:id", findUser);
router.get("/login", loginUser);

export default router;