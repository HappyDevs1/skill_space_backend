# SkillSpace

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
![Render Status](https://img.shields.io/badge/Render-Deployed-success)

Live API URL: [https://your-api.onrender.com](https://skill-space-backend.onrender.com)

A brief description of your API and its purpose.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [API Reference](#api-reference)
- [Development Setup](#development-setup)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- List key features of your API
- Authentication/Authorization
- Rate limiting
- Error handling
- Live documentation
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
`https://skill-space-backend.onrender.com/`

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



### Example Request
```http
GET /user/users
Authorization: Bearer <your-token>
