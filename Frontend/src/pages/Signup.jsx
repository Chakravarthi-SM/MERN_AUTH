import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "@/assets/assets";
import { Lock, Mail,User } from "lucide-react";
import { toast } from "sonner";





const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:8000/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message, {
          position: "top-center", // top of the screen
          autoClose: 3000, // 2 seconds
          hideProgressBar: true, // hide progress bar
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative w-full h-screen md:h-[760px] overflow-hidden">
      <div className="min-h-screen flex flex-col to-muted/20">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6 rounded-lg shadow-2xl p-10 bg-white">
            <div className="flex items-center justify-center w-full max-w-sm">
              <img
                src={assets.mern_auth_logo}
                alt=""
                className="w-28 sm:w-60"
              />
            </div>
            <Card className="w-full max-w-sm ">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-green-600">
                  Sign up
                </CardTitle>
                <CardDescription className="text-center text-black font-normal text-base">
                  Create your account to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="full name">
                        <User className="w-5 h-5 text-green-500" />
                      
                      User Name
                    </Label>
                    <Input
                      id="full name"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your user name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      <Mail className="w-5 h-5 text-green-500" />
                      
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">
                      <Lock className="w-5 h-5 text-green-500" />


                      Password
                    </Label>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        required
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute cursor-pointer right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4  text-gray-600" />
                        ) : (
                          <Eye className="w-4 h-4  text-gray-600" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-green-600 text-base cursor-pointer hover:bg-green-500"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account..
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-green-600 font-medium cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
