import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { getData } from "@/context/userContext";
import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { assets } from "@/assets/assets";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:8000/user/forgot-password`,
        {
          email,
        },
      );
      if (res.data.success) {
        navigate(`/verify-otp/${email}`);
        toast.success(res.data.message, {
          position: "top-center", // top of the screen
          autoClose: 3000, // 2 seconds
          hideProgressBar: true, // hide progress bar
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setEmail("");
      }
    } catch (error) {
      
      toast.error(error.response.data.message, {
                position: "top-center", // top of the screen
                autoClose: 3000, // 2 seconds
                hideProgressBar: true, // hide progress bar
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative w-full h-screen md:h-[760px] overflow-hidden">
      <div className="min-h-screen flex flex-col">
        {/* Main content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6 rounded-lg shadow-2xl p-10 bg-white ">
            <div className="flex items-center justify-center w-full max-w-sm">
                          <img
                            src={assets.mern_auth_logo}
                            alt=""
                            className="w-28 sm:w-60"
                          />
                        </div>
            {/* <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-green-600">
                Reset Your password
              </h1>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you instructions to
                reset your password
              </p>
            </div> */}
            <Card className="bg-white">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-green-600">
                  Forgot Password?
                </CardTitle>
                <CardDescription className="text-center text-base font-normal text-black">
                  {isSubmitted
                    ? "Check your email for reset instructions"
                    : "Enter your email address to recieve a password reset link"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {isSubmitted ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">Check your inbox</h3>
                      <p className="text-muted-foreground">
                        We've sent a password reset link to{" "}
                        <span className="font-medium text-foreground">
                          {email}
                        </span>
                      </p>
                      <p>
                        If you don't see the email, check your spam folder or{" "}
                        <button
                          className="text-primary hover:underline font-medium"
                          onClick={() => setIsSubmitted(false)}
                        >
                          try again
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2 relative text-gray-800">
                      <Label>
                        <Mail className="w-5 h-5 text-green-500" />
                        Email
                        </Label>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <Button className="w-full bg-green-600 text-base font-normal text-white relative hover:bg-green-500 cursor-pointer">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending reset link..
                        </>
                      ) : (
                        "Send reset link"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
              <CardFooter className="flex justify-center">
                <p>
                  Remember your password?{" "}
                  <Link
                    to={"/login"}
                    className="text-green-600 hover:underline font-medium relative"
                  >
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
