import React, { use } from "react";
import { assets } from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Navbar_mern = () => {

    const navigate = useNavigate();
  return (
    <div
      className="w-full flex justify-between items-center p-4 sm:p-6 
        sm:px-24 absolute top-0"
    >
      <img src={assets.mern_auth_logo} alt="" className="w-28 sm:w-60" />

      <button
      onClick={() => navigate("/signup")}
        className="flex items-center gap-2 text-base font-medium
            rounded-xl px-6 py-2 bg-green-500 text-shadow-black hover:bg-green-600 transition-all cursor-pointer"
      >
        Get Started
        <img src={assets.arrow_icon} alt="" className="text-black"/>
      </button>
    </div>
  );
};

export default Navbar_mern;