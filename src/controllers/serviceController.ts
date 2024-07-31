import { Request, Response } from "express";
import Service, { IService } from "../models/serviceModel";

export async function createService(req: Request, res: Response) {
  const { title, description, price, freelancer } = req.body;
  try {
    const newService = await new Service({ title, description, price, freelancer });

    await newService.save();
    
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to create a new service" });
  }
}

export async function getAllServices(req: Request, res: Response) {
  try {
    const foundService = await Service.find();
    
    return res.status(200).json({ message: "Service found", service: foundService });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetch services" });
  }
}

export async function getServiceById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const foundService = await Service.findById(id);
    if (!foundService) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json({ message: "Service found", service: foundService });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function updateService(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(id, { title, description, price });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json({ message: "Service updated successfully", service: updatedService });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteService(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json({message: "Service deleted successfully", service: deletedService });
  } catch (error) {
    res.status(500).json({ message: "Server errror" });
  }
}