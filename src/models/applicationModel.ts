import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  _id: string;
  name: string;
  email: string;
  phone: number;
  about: string;
  cv: string;
  portfolio: string;
  service: mongoose.Types.ObjectId;
  // coverLetter: string;
  status: "pending" | "accepted" | "rejected";
  applicationDate: Date;
}

const applicationSchema = new Schema<IApplication>({
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  about: { type: String, required: true },
  cv: {type: String, required: true},
  portfolio: { type: String, required: true },
  // coverLetter: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  applicationDate: { type: Date, default: Date.now },
},
{ timestamps: true });

const Application = mongoose.model<IApplication>("Application", applicationSchema);

export default Application;