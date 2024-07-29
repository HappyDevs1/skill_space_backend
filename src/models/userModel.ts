import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  id: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  role: "client" | "freelancer";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["client", "freelancer"]},
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;