import { Request, Response } from "express";
import multer from "multer";
import Application, { IApplication } from "../models/applicationModel";
import User from "../models/userModel";

// export async function createApplication(req: Request, res: Response) {
//   const { name, email, phone, about, portfolio } = req.body;
//   // const { service } = req.params;

//   try {
//     // Validate required fields
//     if (!name || !email || !phone || !about || !portfolio) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Check if the file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: "CV file is required" });
//     }

//     // Create the application
//     const createdApplication = new Application({
//       name,
//       email,
//       phone,
//       about,
//       cv: req.file.filename,
//       portfolio,
//       // service,
//     });

//     await createdApplication.save();

//     return res
//       .status(201)
//       .json({ message: "Application created successfully", application: createdApplication });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error, failed to submit application" });
//   }
// }

export const createApplication = (req: Request, res: Response) => {
  const { name, email, phone, about, portfolio } = req.body;
  try {
    if (!req.file) {
      res.status(400).send({
        message: "No file uploaded",
      });
    } else {
      const newApplicant = Application.create({ name, email, phone, about, cv: req.file.filename, portfolio})

      console.log(newApplicant);
      res.status(200).send({ message: "Application sent out" })
    }
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
};



export async function getAllApplication(req: Request, res: Response) {
  try {
    const foundApplications = await Application.find();

    if (!foundApplications) {
      return res.status(404).json({ message: "No application found" });
    }

    res.status(200).json({ message: "Applications found", applications: foundApplications });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetched applications"});
  }
}

export async function getApplicationById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(409).json({ message: "Invalid Id" });
    }

    const foundApplication = await Application.findById(id);

    if (!foundApplication) {
      return res.status(404).json({ message: "Failed to fetch application by id" });
    }

    return res.status(200).json({ message: "Successfully fetched application by id", application: foundApplication });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetch application by id" });
  }
}

export async function editApplication(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body
  try {
    if (!status) {
      return res.status(409).json({ message: "Field cannot be empty" });
    }

    const editedApplication = await Application.findByIdAndUpdate(
      id,
      {status: status},
      {new: true});

      if (!editedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }
      
      return res.status(200).json({ message: "Application status updated successfully", application: editedApplication });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to edit application" });
  }
}

export async function deleteApplication(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deletedApplication = await Application.findByIdAndDelete(id)

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted succesfully"});
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to delete application" });
  }
}