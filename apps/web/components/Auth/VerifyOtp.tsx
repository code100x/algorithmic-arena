"use client";

import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import Image from "next/image";

interface CenteredOTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CenteredOTPInput: React.FC<CenteredOTPInputProps> = ({
  value,
  onChange,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 1 && /^\d*$/.test(newValue)) {
      const newOTP = value.split("");
      newOTP[index] = newValue;
      onChange(newOTP.join(""));
      if (newValue.length === 1 && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          ref={(el: HTMLInputElement | any) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          className="w-12 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

const VerifyOtpForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("OTP submitted:", otp);
    }, 2000);
  };

  const handleResend = () => {
    console.log("Resending OTP...");
  };

  return (
    <Card className="w-[350px] mx-auto border-none">
      <CardHeader className="text-center items-center mt-0 pt-0">
        <Image src="/logo.svg" alt="Logo" width={64} height={64} />
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Please enter the 4-digit code below to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">
          We've sent an OTP to your registered email retro@gmail.com
        </p>
        <CenteredOTPInput value={otp} onChange={setOTP} />
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          className="w-full mb-2 bg-blue-600 text-white"
          onClick={handleVerify}
          disabled={otp.length !== 4 || loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
        <div onClick={handleResend}>
          Didn't receive the code ?{"  "}{" "}
          <span className="text-blue-500"> Resend OTP</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VerifyOtpForm;
