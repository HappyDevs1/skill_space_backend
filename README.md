# SkillSpace

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
![Render Status](https://img.shields.io/badge/Render-Deployed-success)

Live BASE API URL: [https://skill-space-backend.onrender.com](https://skill-space-backend.onrender.com)

A REST API for a job board platform to interact with managing users, companies, job listings, job applicants, etc.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [API Reference](#api-reference)
- [Development Setup](#development-setup)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Authentication with JWT
- Password hashing using Bcrypt
- File uploads for for profile pictures and resume (handled with Multer)
- Company & User profiles stored in isolation
- Job applications & Admin dashboard
- etc.

## Technologies
- Node.js
- Express
- TypeScript
- (Database: MongoDB Atlas)
- (Authentication: JWT)
- (Security: Bcrypt)
- Render (Hosting)

## API Reference

### Base URL
`https://skill-space-backend.onrender.com`

### Authentication
- JWT
- Bearer Token

### Endpoints

#### Users
- `POST /user/create` - Create a new user
- `GET /user/users` - Get all users
- `GET /user/:id` - Get user by id
- `PUT /user/:id` - Edit user
- `DELETE /user/:id` - Delete user
- `POST /user/login` - Login user


#### Companies
- `POST /company/create` - Create company
- `POST /company/create-featured` - Create featured company
- `GET /company/companies` - Get all companies
- `GET /company/featured` - Get only featured companies
- `POST /company/:id` - Find company by id
- `PUT /company/:id` - Edit company
- `DELETE /company/:id/delete` - Delete company
- `POST /company/login` - Login company


#### Jobs
- `POST /service/:companyId/create` - Create job posting
- `GET /service/services` - Get all job postings
- `GET /service/filter` - Filter jobs
- `GET /service/featured` - Get featured jobs
- `PUT /service/:id/edit` - Edit job posting
- `GET /service/:id` - Get job by id
- `DELETE /service/:id/delete` - Delete job posting

#### Job Applications
- `GET /application/applications` - Get all job applications
- `POST /application/:id/upload`, - Apply to a job
- `GET /application/:id/download/cv` - Download applicant resume
- `GET /application/:id` - Get application by id
- `PUT /application/:id/edit` - Edit job application
- `DELETE /application/:id/delete` - Delete job application

#### Blogs
- `POST /blog/create` - Upload a blog
- `GET /blog/get/blogs` - Get all blogs
- `DELETE /blog/delete/:id` - Delete a blog
- `GET /blog/get/:id` - Get blog by id

## Interested in contributing?
1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open pull request
