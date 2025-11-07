# MERN Library Management System (Minimal Working App)

## Quick Start
1. **Backend**
   ```bash
   cd backend
   cp .env.example .env
   npm i
   npm run seed
   npm run dev
   ```
2. **Frontend**
   ```bash
   cd frontend
   cp .env.example .env
   npm i
   npm run dev
   ```
3. Login with `admin@example.com` / `Admin@123` (seeded)

## API Base
- Backend runs on `http://localhost:5000`
- Frontend expects `VITE_API_URL=http://localhost:5000/api`

## Notes
- Minimal but complete: Auth, Books, Borrowing, User profile, Dashboard stats.
- Extend Admin pages on frontend as needed.



# 📚 MERN Library Management System

A full-stack **Library Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.  
It allows users to **browse, borrow, and return books**, while **admins** can manage users, books, and monitor the entire system through a visual dashboard.

---

## 🏷️ Project Title and Description

**Project Title:** MERN Library Management System  

**Description:**  
This web application provides an efficient way to manage books, users, and borrowing records for a library.  
Users can register, log in, borrow books, and view their borrow history.  
Admins can manage all books, monitor user activity, and view library statistics through a dashboard.

---

## ✨ Features Implemented

### 👨‍💼 Admin Features
- Add, edit, and delete books  
- Manage users and borrowing records  
- Dashboard displaying total books, users, borrows, and overdue books  
- Search and filter functionality for books by title, author, or ISBN  
- View borrowing trends through charts  

### 👤 User Features
- Register and log in using JWT authentication  
- Browse and search for books  
- Borrow and return books  
- View personal borrowing history  
- Responsive UI for mobile and desktop  

### ⚙️ System Features
- RESTful API with Express.js and Mongoose  
- Role-based access control (User/Admin)  
- Secure authentication using JWT  
- Seed data for quick setup  
- Modern React frontend built with Vite  

---

## 🧰 Technology Stack Used

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Vite, Axios, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT (JSON Web Token) |
| **Utilities** | bcryptjs, cookie-parser, cors, dotenv, morgan, dayjs |
| **Dev Tools** | Nodemon, VSCode |

---

## ⚙️ Prerequisites

| Tool | Version |
|------|----------|
| Node.js | ≥ 18.x |
| npm | ≥ 9.x |
| MongoDB | ≥ 6.x |

---

## 🧭 Installation Instructions (Step-by-Step)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/vibinab/merntest.git



