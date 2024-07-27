import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  service: mongoose.Types.ObjectId;
  freelancer: mongoose.Types.ObjectId;
  coverLetter: string;
  portfolioLink: string;
  applicationDate: Date;
  status: "pending" | "accepted" | "rejected";
}

const applicationSchema = new Schema<IApplication>({
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  freelancer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  coverLetter: { type: String, required: false },
  portfolioLink: { type: String, required: false },
  applicationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
},
{ timestamps: true });

const Application = mongoose.model<IApplication>("Application", applicationSchema);

export default Application;