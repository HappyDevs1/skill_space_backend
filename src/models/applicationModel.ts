import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  _id: string;
  service: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  about: string;
  cv: string;
  portfolio: string;
  user: string;
  // coverLetter: string;
  status: "pending" | "accepted" | "rejected";
  applicationDate: Date;
}

const applicationSchema = new Schema<IApplication>({
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  about: { type: String, required: true },
  cv: {type: String, required: true},
  portfolio: { type: String, required: true },
  user: { type: String, required: true },
  // coverLetter: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  applicationDate: { type: Date, default: Date.now },
},
{ timestamps: true });

const Application = mongoose.model<IApplication>("Application", applicationSchema);

export default Application;