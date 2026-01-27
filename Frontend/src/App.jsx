import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/verify";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home_mern from "./pages/Home_mern";
const App = () => {
  return (
    <>
    <ToastContainer
        position="top-center"   // <-- toast will appear from top
        autoClose={3000}        // auto close after 3s
        hideProgressBar={false} // show progress bar
        newestOnTop={false}     // newest toast below
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Routes>
      {/* ✅ Public Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* ✅ Protected Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home_mern />
          </ProtectedRoute>
        }
      />

      {/* Public routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/verify/:token" element={<Verify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp/:email" element={<VerifyOTP />} />
      <Route path="/change-password/:email" element={<ChangePassword />} />
    </Routes>
    </>
    
  );
};

export default App;
