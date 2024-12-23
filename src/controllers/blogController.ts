import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blogsModel";
import { Types } from "mongoose";

export async function createBlog (req: Request, res: Response) {
  const { name, about, profilePicture, category, title, subheading, content } = req.body;
  try {
    if (!name || !about || !profilePicture || !category || !title || !subheading || !content) {
      res.status(406).json({ message: "All fields are required" })
    }

    const createdBlog = new Blog({name, about, profilePicture, category, title, subheading, content });

    await createdBlog.save();

    res.status(201).json({ message: "New blog has been successfully created", blog: createdBlog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

export async function getBlog (req: Request, res: Response) {
  try {
    const foundBlogs = await Blog.find();

    res.status(200).json({ message: "Blogs have been successfully retrieved", blogs: foundBlogs})

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

export async function getBlogById (req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (!Types.ObjectId.isValid(id)) {
      res.status(406).json({ message: "Invalid object id" })
      return;
    }

    const foundBlog = await Blog.findById(id)

    if (!foundBlog) {
      res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog successfully retrieved", blog: foundBlog })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

export async function deleteBlog (req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (!Types.ObjectId.isValid(id)) {
      res.status(406).json({ message: "Invalid object id" })
    }
    
    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted succussfully", blog: deletedBlog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}