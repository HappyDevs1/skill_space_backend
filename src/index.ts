import express from "express";
import type { Request, Response } from "express";
import mongoose from 'mongoose';
import { MONGODB_URL, PORT } from "./config";
import cors from "cors";
import route from "../src/routes/userRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use(route)

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Setting up the server")
})

mongoose.connect(MONGODB_URL)
.then(() => {
  console.log("connected to MongoDB successfully")
  app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
  })
})
.catch((error) => {
  console.log("Failed to run the server", error);
})