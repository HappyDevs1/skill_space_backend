import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  about: string;
  perksAndBenefits: string;
  website: string;
  featured: boolean;
  profilePicture: string;
  services: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: { type: String, required: true },
  perksAndBenefits: { type: String, required: false },
  website: { type: String, required: false },
  featured: { type: Boolean, required: true },
  profilePicture: {
    type: String,
    default:
      "https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1",
  },
  services: [{ type: mongoose.Types.ObjectId, ref: "Service", default: [] }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Company = mongoose.model<ICompany>("Company", CompanySchema);

export default Company;
