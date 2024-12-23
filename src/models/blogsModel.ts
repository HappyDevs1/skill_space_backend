import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  _id: string;
  name: string;
  about: string;
  profilePicture: string;
  category: string;
  title: string;
  subheading: string;
  content: string;
  postedDate: Date;
}

const blogSchema = new Schema<IBlog>({
  name: { type: String, required: true },
  about: { type: String, required: true },
  profilePicture: { type: String, required: true },
  category: { type: String, enum: ["design", "development", "marketing"]},
  title: { type: String, required: true },
  subheading: { type: String, required: true },
  content: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
},
{ timestamps: true });

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;