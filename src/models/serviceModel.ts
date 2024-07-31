import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  _id: string;
  serviceId: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema({
  serviceId: { type: String, required: true, unique: true },
  title: { type: String, required: true, },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Service = mongoose.model<IService>("Service", ServiceSchema);

export default Service;