import { BookA, BookOpen, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { assets } from "@/assets/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getData } from "@/context/userContext";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; 


const Navbar = () => {
  const { user, setUser } = getData() || {};
  const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUser(null);
        localStorage.clear();
        toast.success(res.data.message, {
                  position: "top-center", // top of the screen
                  autoClose: 3000, // 2 seconds
                  hideProgressBar: true, // hide progress bar
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
        navigate("/"); // ✅ IMPORTANT
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="p-2 border-b  border-gray-200 bg-transparent">

      <div className="max-w-7xl mx-auto flex justify-between items-center">


        {/* logo section  */}

        <div className="flex gap-2 items-center">
          <img
          onClick={() => navigate("/home")}
            src={assets.mern_auth_logo}
            alt="logo"
            className="w-28 sm:w-60 cursor-pointer"
          />
        </div>

        <div className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <Avatar className="w-12 h-12 border-2 border-shadow-black">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      <User className="w-6 h-6 text-shadow-black" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="cursor-pointer"
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={"/login"}>
                <li>Login</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
