import express from "express";
import type { Request, Response } from "express";
import mongoose from 'mongoose';
import { MONGODB_URL, PORT } from "./config";
import cors from "cors";
import userRoute from "../src/routes/userRoute";
import serviceRoute from "../src/routes/serviceRoute";
import applicationRoute from "../src/routes/applicationRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/service", serviceRoute);
app.use("/application", applicationRoute);

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