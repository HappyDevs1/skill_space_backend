import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  _id: string;
  name: string;
  email: string;
  phone: number;
  about: string;
  service: mongoose.Types.ObjectId;
  freelancer: mongoose.Types.ObjectId;
  coverLetter: string;
  portfolioLink: string;
  applicationDate: Date;
  status: "pending" | "accepted" | "rejected";
}

const applicationSchema = new Schema<IApplication>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  about: { type: String, required: true },
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  freelancer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  coverLetter: { type: String, required: true },
  portfolioLink: { type: String, required: true },
  applicationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
},
{ timestamps: true });

const Application = mongoose.model<IApplication>("Application", applicationSchema);

export default Application;