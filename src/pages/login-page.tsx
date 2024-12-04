import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const { toast } = useToast();

  interface VerifyOtp {
    accessToken: string;
    refreshToken: string;
  }

  const handleSubmit = async () => {
    try {
      if (!otpVisible) {
        try {
          const otp = await api.post("/auth/send-otp", { email });
          console.log(otp);
          setOtpVisible(true);
        } catch (error) {
          toast({
            title: "Failed To Send Otp",
            description: `${error}`,
          });
        }
      } else {
        const response: VerifyOtp = await api.post("/auth/verify-otp", {
          email,
          otp,
        });
        console.log(response);
        api.setTokens(response.accessToken, response.refreshToken);
        // Handle successful login (e.g., redirect to dashboard)
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Failed To Send Otp",
        description: `${error}`,
      });
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
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
            <div className="grid gap-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          )}

          <Button type="button" onClick={handleSubmit} className="w-full">
            {otpVisible ? "Verify OTP" : "Submit"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline">
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
