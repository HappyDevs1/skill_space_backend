import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: "Gauteng" | "Eastern-Cape" | "Mpumalanga" | "Free-State" | "Limpopo" | "North-West" | "Nothern-Cape" | "Western-Cape" | "KwaZulu-Natal" | "Remote";
  level: `"internship" | "junior" | "mid-level" | "senior"`;
  department: "finance" | "technology" | "healthcare" | "real-estate" | "construction";
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  freelance: mongoose.Types.ObjectId;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true, enum: ["Gauteng", "Eastern-Cape", "Mpumalanga", "Free-State", "Limpopo", "North-West", "Nothern-Cape", "Western-Cape", "KwaZulu-Natal", "Remote"] },
  level: { type: String, required: true, enum: ["internship", "junior", "mid-level", "senior"]},
  department: { type: String, required: true, enum: ["finance", "technology", "healthcare", "real-estate", "construction"]},
  featured: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  freelancer: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

const Service = mongoose.model<IService>("Service", ServiceSchema);

export default Service;