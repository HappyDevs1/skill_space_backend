import { Request, Response } from "express";
import Service, { IService } from "../models/serviceModel";
import { Types } from "mongoose";
import { AuthRequest } from "../middleware/authMiddleware";

export async function createService(req: AuthRequest, res: Response) {
  const { title, description, price, location, level, department, freelancer } = req.body;

  try {
    const newService = await new Service({
      title,
      description,
      price,
      location,
      level,
      department,
      freelancer
    });

    await newService.save();

    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Server error, failed to create a new service" });
  }
}

export async function getAllServices(req: Request, res: Response) {
  try {
    const foundService = await Service.find().populate(
      "freelancer",
      "name profilePicture"
    );

    return res
      .status(200)
      .json({ message: "Service found", service: foundService });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetch services" });
  }
}

export async function getServiceById(req: Request, res: Response) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid user ID format" });
    return;
  }
  try {
    const foundService = await Service.findById(id).populate(
      "freelancer",
      "name ProfilePicture"
    );
    if (!foundService) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res
      .status(200)
      .json({ message: "Service found", service: foundService });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getServiceByFilter(req: Request, res: Response) {
  const { location, level, department } = req.body;
  try {
    const filteredService = await Service.find({
      location,
      level,
      department,
    }).populate("freelancer", "name profilePicture");
    res
      .status(200)
      .json({ message: "Filtered service's found", services: filteredService });
  } catch (error) {
    res.status(500).json({ message: "Server error failed" });
  }
}

export async function getFeaturedServices(req: Request, res: Response) {
  try {
    const featuredServices = await Service.find({ featured: true }).populate(
      "freelancer",
      "name profilePicture"
    );

    if (featuredServices.length === 0) {
      return res
        .status(404)
        .json({ message: "No featured services were found" });
    }

    res
      .status(200)
      .json({ message: "Featured services found", services: featuredServices });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error, failed to fetch featured services" });
  }
}

export async function updateService(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, price, location, level, department, featured } =
    req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(id, {
      title,
      description,
      price,
      location,
      level,
      department,
      featured,
    });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res
      .status(200)
      .json({
        message: "Service updated successfully",
        service: updatedService,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteService(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res
      .status(200)
      .json({
        message: "Service deleted successfully",
        service: deletedService,
      });
  } catch (error) {
    res.status(500).json({ message: "Server errror" });
  }
}
