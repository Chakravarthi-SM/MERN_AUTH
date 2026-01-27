import { useNavigate } from "react-router-dom";
import personIcon from "../assets/header_img.png";
import Navbar_landingPage from "../components/Navbar_landingPage.jsx";


const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar_landingPage />
     
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-16">
        {/* GIF / Animation */}
        <img src={personIcon} alt="auth animation" className="w-80 mb-8" />

        <h2 className="text-4xl font-bold text-black mb-4">
          Secure Authentication for MERN Apps
        </h2>

        <p className="text-shadow-black text-base font-normal max-w-xl mb-8">
         MERN-AUTH provides secure signup, login, and JWT authentication for MERN apps, 
         ensuring protected routes and safe sessions throughout.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-green-500 text-shadow-black  rounded-xl hover:bg-green-600
           transition cursor-pointer text-base font-medium"
        >
          Get Started
        </button>
      </section>
       <footer className="border-t py-2 px-6 mt-auto w-full bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row 
        justify-between items-center gap-2 text-sm text-gray-700">
          <p className="mb-0 text-center sm:text-left">
            @Built with MongoDB, Express, React, and Node.js
          </p>
          <p className="text-center sm:text-right">
            © 2026 MERN-AUTH. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
