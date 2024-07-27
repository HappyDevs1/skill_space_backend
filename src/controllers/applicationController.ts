import { Request, Response } from "express";
import Application, { IApplication } from "../models/applicationModel";

export async function createApplication(req: Request, res: Response) {
  const { service, freelancer, coverLetter, portfolioLink } = req.body;
  try {
    if (req.body) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const createdApplication = await new Application({service, freelancer, coverLetter, portfolioLink});

    createdApplication.save();

    return res.status(201).json({message: "Application created successfully", application: createdApplication });
  } catch (error) {
    res.status(400).json({ message: "Server error, failed to submit application"});
  }
}

export async function getAllApplication(req: Request, res: Response) {
  try {
    const foundApplications = await Application.find();

    if (foundApplications.length == 0) {
      return res.status(204).json({ message: "Applications empty" });
    }
    res.status(200).json({ message: "Applications found", applications: foundApplications });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetched applications"});
  }
}

export async function getApplicationById(req: Request, res: Response) {
  const { id } = req.body;
  try {
    if (!req.body) {
      return res.status(409).json({ message: "Field cannot be empty" });
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

export async function editingApplication(req: Request, res: Response) {
  const { applicationId, applicationStatus} = req.body;
  try {
    if (req.body) {
      return res.status(409).json({ message: "Field cannot be empty" });
    }

    const editedApplication = await Application.findByIdAndUpdate(
      applicationId,
      {status: applicationStatus},
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
  const { id } = req.body;
  try {
    const deletedApplication = await Application.findByIdAndDelete(id)

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to delete application" });
  }
}