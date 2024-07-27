import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  freelance: mongoose.Types.ObjectId;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  freelancer: { type: mongoose.Types.ObjectId, ref: "User", required: true },
},
{ timestamps: true });

ServiceSchema.pre<IService>("save", function(next) {
  this.updatedAt = new Date();
});

const Service = mongoose.model<IService>("Service", ServiceSchema);

export default Service;