import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import { MONGODB_URL, PORT } from "./config";
import userRoute from "../src/routes/userRoute";
import serviceRoute from "../src/routes/serviceRoute";
import applicationRoute from "../src/routes/applicationRoute";
import companyRoute from "../src/routes/companyRoute";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRoute);
app.use("/service", serviceRoute);
app.use("/application", applicationRoute);
app.use("/company", companyRoute);

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to run the server", error);
  });
