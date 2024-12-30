# Trackier Assignment - SDE (Backend)

## Overview

This is a backend API for managing users, books, and transactions. It allows users to register, activate accounts, login, borrow books, and track their borrowing history. The backend is built using **Express.js** and **Prisma ORM** for database management, with authentication handled via **JWT**.

## Features

- **Authenctication Management**:
  - User registration (signup)
  - Account activation
  - User login (JWT Authentication)
  - User logout

- **User Management**:
  - User Profile Update
  - User Password Update  

- **Book Management**:
  - Add a new book
  - Update book details
  - Delete a book by ID
  - Get a book by ID
  - Get all books along with pagination and search query
  - Get all books borrowed by an individual user
  - Get Top 10 most frequently borrowed books

- **Transaction Management**:
  - Borrow books
  - Return books (implied, can be implemented similarly to borrowing)

## Technologies Used

- **Node.js** with **Express.js**
- **Typescript** for types safety
- **Prisma ORM** for database interactions
- **JWT** for authentication
- **Bcryptjs** for password hashing
- **EJS** for email templates
- **Nodemailer** for email notifications
- **Swagger UI** for API documentation

## Requirements

Before running the project, ensure you have the following installed:

- Node.js (v16 or above)
- npm (v8 or above)
- PostgreSQL

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/AmAyush18/Trackier_Assignment_Backend.git
cd Trackier_Assignment_Backend
```

### 2. Install Dependencies
Run the following command to install the project dependencies:

```bash
npm install
```

### 3. Setup Environment Variables
Create a .env file in the root directory and add the necessary environment variables. Here’s an example:

```bash
PORT=3000
ORIGIN=http://localhost:5173
POSTGRES_PRISMA_URL=''
POSTGRES_URL_NON_POOLING=''
ACCESS_TOKEN=479881e4111c4ce23965af3539d06d738e57df0b2c88229c7996fc8eb8c76e3b
REFRESH_TOKEN=3818c6c9f6a6eb09783ea01b782df5b0f68c7972235f6181bf2de340e22a5a4b
ACTIVATION_SECRET=9b421a6d63b78303debeb40d78965e4657caf3d500dddc0be37eb1338b519f0c
SMTP_HOST='smtp.gmail.com'
SMTP_PORT=465
SMTP_MAIL=''
SMTP_PASSWORD=''
```

### 4. Run Prisma Migrations and Development Server

```bash
npm run dev
```

This command will:

 - Generate Prisma Client
 - Apply database schema changes (using prisma db push)
 - Start the server using ts-node-dev for development

## API Documentation

This API is documented using **Swagger**. Once the server is running, visit the following URL to view the API documentation:

- **Local URL**:  
  http://localhost:3000/api/v1/docs

- **Hosted URL on Render**:  
  https://trackier-assignment-backend-4z3j.onrender.com/api/v1/docs/#/

## Database Schema
The database schema is managed with Prisma ORM and consists of the following models:

- **User**: Represents the users in the system (includes details such as email, password, username, etc.).
- **Book**: Represents the books available in the system (includes details such as title, author, genre, etc.).
- **Transaction**: Represents the borrowing and returning of books (includes details such as userId, bookId, borrowedAt, and returnedAt).
