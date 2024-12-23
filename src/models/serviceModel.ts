import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./userModel";

export interface IService extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: "Gauteng" | "Eastern-Cape" | "Mpumalanga" | "Free-State" | "Limpopo" | "North-West" | "Nothern-Cape" | "Western-Cape" | "KwaZulu-Natal" | "Remote";
  level: "Internship" | "Junior" | "Mid-level" | "Senior";
  department: "Finance" | "Technology" | "Healthcare" | "Real-estate" | "Construction";
  applications: mongoose.Types.ObjectId[];
  company: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true, enum: ["Gauteng", "Eastern-Cape", "Mpumalanga", "Free-State", "Limpopo", "North-West", "Nothern-Cape", "Western-Cape", "KwaZulu-Natal", "Remote"] },
  level: { type: String, required: true, enum: ["Internship", "Junior", "Mid-level", "Senior"]},
  department: { type: String, required: true, enum: ["Finance", "Technology", "Healthcare", "Real-estate", "Construction"]},
  applications: [{type: mongoose.Types.ObjectId, ref: "Application", required: true }],
  company: { type: mongoose.Types.ObjectId, ref: "Company", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Service = mongoose.model<IService>("Service", ServiceSchema);

export default Service;