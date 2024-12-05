import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/services/AxiosInterceptor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// import { GoogleLogin } from "@react-oauth/google";

interface VerifyOtp {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpVisible, setOtpVisible] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "default" | "error";
    title: string;
    description: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlertInfo(null);
    try {
      if (!otpVisible) {
        const otp = await api.post("/auth/send-otp", { email });
        console.log("Reached");
        console.log(otp);
        setOtpVisible(true);
        setAlertInfo({
          type: "default",
          title: "OTP Sent",
          description: "Please check your email for the OTP.",
        });
      } else {
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
          const response: VerifyOtp = await api.post("/auth/verify-otp", {
            email,
            otp: otpValue,
          });
          console.log(response);
          api.setTokens(response.accessToken, response.refreshToken);
          if (response.isNewUser) {
            setIsNewUser(true);
            setAlertInfo({
              type: "default",
              title: "OTP Verified",
              description: "Please complete your profile.",
            });
          } else {
            setAlertInfo({
              type: "default",
              title: "Login Successful",
              description: "Welcome back!",
            });
            navigate("/");
            // Handle successful login (e.g., redirect to dashboard)
          }
        } else {
          setAlertInfo({
            type: "error",
            title: "Invalid OTP",
            description: "Please enter a valid 6-digit OTP.",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlertInfo({
        type: "error",
        title: "Error",
        description: "Failed to process request. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setAlertInfo(null);
    try {
      await api.post("/auth/resend-otp", { email });
      setAlertInfo({
        type: "default",
        title: "OTP Resent",
        description: "A new OTP has been sent to your email.",
      });
    } catch (error) {
      console.error("Resend OTP error:", error);
      setAlertInfo({
        type: "error",
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlertInfo(null);
    try {
      const response = await api.post("/users/updateUser", {
        name,
        phoneNumber,
      });
      console.log(response);
      setAlertInfo({
        type: "default",
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      navigate("/");
      // Handle successful profile update (e.g., redirect to dashboard)
    } catch (error) {
      console.error("Profile update error:", error);
      setAlertInfo({
        type: "error",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    setIsLoading(true);
    setAlertInfo(null);
    try {
      const response: VerifyOtp = await api.post("/auth/google-signin", {
        token: credentialResponse.credential,
      });
      api.setTokens(response.accessToken, response.refreshToken);
      setAlertInfo({
        type: "default",
        title: "Google Sign-In Successful",
        description: "Welcome!",
      });
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setAlertInfo({
        type: "error",
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {alertInfo && (
          <Alert
            className={`mb-4 ${
              alertInfo.type === "error" ? "bg-destructive/15" : ""
            }`}
          >
            <AlertTitle>{alertInfo.title}</AlertTitle>
            <AlertDescription>{alertInfo.description}</AlertDescription>
          </Alert>
        )}
        {!isNewUser ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {otpVisible && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={otp.join("")}
                  onChange={(value) => {
                    const newOtp = value
                      .split("")
                      .concat(Array(6).fill(""))
                      .slice(0, 6);
                    setOtp(newOtp);
                  }}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {otpVisible ? "Verify OTP" : "Send OTP"}
            </Button>

            {otpVisible && (
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOTP}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Resend OTP
              </Button>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setAlertInfo({
                  type: "error",
                  title: "Google Sign-In Failed",
                  description:
                    "An error occurred during Google Sign-In. Please try again.",
                });
              }}
            /> */}
          </form>
        ) : (
          <form onSubmit={handleCompleteProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Parth Momaya"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="7620170904"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Complete Profile
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
