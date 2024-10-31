import { Request, Response } from "express";
import Company, { ICompany } from "../models/companyModel";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import path from "path";
import { UploadedFile } from "express-fileupload";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export async function createCompany(req: Request, res: Response) {
  const { name, email, password, about } = req.body;
  
  let profilePicture = "https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1";

  try {
    if (req.files && req.files.profilePicture) {
      let file = req.files.profilePicture as UploadedFile;
  
      const uploadPath = path.join(__dirname, '../public/img', file.name);
  
      await file.mv(uploadPath, (error) => {
        if (error) return res.status(500).send(error);
      });
  
      profilePicture = `/img/${file.name}`;
    }

    if (!name || !email || !password || !about) {
      return res.status(406).json({ message: "All fields are required" });
    }

    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return res.status(409).json({ message: "Company already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newCompany = new Company({ name, email, password: hashedPassword, about, profilePicture });

    await newCompany.save();

    const token = jwt.sign({ id: newCompany._id }, JWT_SECRET , { expiresIn: "1h" });

    res.status(201).json({ message: "Company registered successfully", companyToken: token, company: newCompany });
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: "Company with this email already exists" });
    }
    console.log(error);
    res.status(500).json({ message: "Server error, failed to create a new company", error });
  }
}

export async function getCompany(req: Request, res: Response) {
  try {
    const foundCompanies = await Company.find();

    res.status(200).json({ message: "Companies found", company: foundCompanies })
  } catch (error) {
    console.log(error);
  }
}

export async function findCompany(req: Request, res: Response) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid company ID format" });
    return;
  }
  try {
    const foundCompany = await Company.findById(id);
    if (!foundCompany) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ message: "Company found", company: foundCompany } )
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetch company", error });
  }
}

export async function getFeaturedCompany(req: Request, res: Response) {
  try {
    const featuredCompany = await Company.find({ featured: true });

    if (featuredCompany.length === 0) {
      res.status(404).json({ message: "No featured company found"});
    }

    res.status(200).json({ message: "Featued companies's found", company: featuredCompany})
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to fetch company", error });
  }
}

export async function editCompany(req: Request, res: Response) {
  const { id } = req.params;
  const { name, email, password, about } = req.body;

  try {
    const editedCompany = await Company.findByIdAndUpdate(id, { name, email, password, about });

    if (!editedCompany) {
      return res.status(404).json({ message: "Company not found"});
    }

    res.status(200).json({ message: "Company updated succesfully", company: editedCompany });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to edit company", error });
  }
}

export async function deleteCompany(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to delete company", error});
  }
}

export async function loginCompany(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!req.body) {
      return res.status(406).json({ message: "Fields cannot be empty" });
    }

    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: company._id }, JWT_SECRET, { expiresIn: "1h" });

    const redirectUrl = `/profile/${company._id}`;

    res.status(200).json({ message: `Login successful, logged in as ${company}`, loginToken: token, redirectUrl: redirectUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to login company", error });
  }
}
