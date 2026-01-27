# 🔐 MERN Authentication System

A full-stack **MERN Authentication System** with secure user registration, login, email verification (OTP), protected routes, and session handling.

This project is built using **MongoDB, Express.js, React.js, and Node.js**, following clean project structure and best practices.

---

## 🚀 Features

### Backend
- User Registration & Login
- Email Verification using OTP
- JWT-based Authentication
- Protected Routes (Middleware)
- Password Hashing using bcrypt
- Session Management
- Input Validation
- MongoDB Database Integration
- Modular & Scalable Structure

### Frontend
- Modern React UI (Vite)
- Authentication Pages (Signup, Login, Verify OTP, Forgot Password)
- Protected Routes
- Context API for User State Management
- Toast Notifications
- Responsive Design
- Reusable UI Components

---
## 📂 Project Structure
<pre>
MERN_AUTH/
├── Backend/
│   ├── controller/
│   ├── database/
│   ├── emailVerify/
│   ├── middlewares/
│   ├── model/
│   ├── routes/
│   ├── validators/
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
  </pre>


## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Context API
- Toast Notifications

---

## 🔐 Authentication Flow

1. User signs up  
2. OTP is sent to registered email  
3. User verifies email using OTP  
4. User logs in with credentials  
5. JWT is generated and stored securely  
6. Protected routes are accessible only to authenticated users

---

## 🧪 Future Enhancements
- Google OAuth Authentication  
- Refresh Token Implementation  
- Role-Based Access Control  
- Admin Dashboard  
- Rate Limiting  
- Unit and Integration Testing

---

## 📌 Important Notes
- `node_modules` and `.env` files are ignored using `.gitignore`  
- Ensure MongoDB is running before starting the backend  
- Never expose sensitive environment variables

---

## 👨‍💻 Author
 <h2>Eslavath Chakravarthi</h2>  

---

## ⭐ Support
If you find this project useful, consider giving it a ⭐ on GitHub!
