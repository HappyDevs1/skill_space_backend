import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import bcrypt from "bcrypt";

export async function createUser(req: Request, res: Response) {
  const { name, email, password, role } = req.body;

  try {
    if (!req.body) {
      return res.status(406).json({ message: "Fields cannot be empty" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error, failed to create a new user" });
  }
}

export async function findUser(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const foundUser = await User.findById({ id });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", user: foundUser } )
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetch user" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!req.body) {
      return res.status(406).json({ message: "Fields cannot be empty" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: `Login successful, logged in as ${user}` });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to login user" });
  }
}
