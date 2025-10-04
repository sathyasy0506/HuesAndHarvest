import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const API_BASE = "https://admin.huesandharvest.com/api"; // <-- change this

const LoginForm = ({ onForgotPassword, onSwitchToSignUp }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Flow state
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  // Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("hh_token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, otpTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/flso.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });
      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        setOtpTimer(60);
        alert("OTP sent successfully");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || !otp) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/flvo.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber, otp }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        // Save token
        localStorage.setItem("hh_token", data.token);
        // Redirect to home
        window.location.href = "/";
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while verifying OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtpTimer(60);
    handleSendOtp(new Event("submit")); // resend OTP
  };

  const handleBackToPhone = () => {
    // Reset everything
    setPhoneNumber("");
    setOtp("");
    setOtpSent(false);
    setOtpTimer(60);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={otpSent ? handleOtpSubmit : handleSendOtp}
      className="space-y-4 font-outfit max-w-md mx-auto"
    >
      {/* Phone Number */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-color)" }}
        >
          Phone Number
        </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
          style={{
            borderColor: "var(--primary-color)",
            backgroundColor: "var(--sho-bg-color)",
            color: "var(--text-color)",
          }}
          placeholder="Enter phone number"
          required
        />
      </div>

      {/* Step 2: OTP Verification */}
      {otpSent && (
        <div>
          <p className="text-sm mb-4 text-center font-medium text-green-600">
            OTP sent to <span>{phoneNumber}</span>
          </p>

          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-color)" }}
          >
            Enter OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
            style={{
              borderColor: "var(--primary-color)",
              backgroundColor: "var(--sho-bg-color)",
              color: "var(--text-color)",
            }}
            placeholder="Enter OTP"
            required
          />

          {/* OTP actions */}
          <div className="flex justify-between mt-2 text-sm">
            <span style={{ color: "var(--text-color)" }}>
              OTP expires in {otpTimer}s
            </span>
            <button
              type="button"
              disabled={otpTimer > 0}
              className={`underline ${
                otpTimer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-800"
              }`}
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 font-outfit"
        style={{
          backgroundColor: "var(--primary-color)",
          color: "#ffffff",
        }}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : otpSent ? (
          "Verify OTP"
        ) : (
          "Send OTP"
        )}
      </button>

      {/* "Not you?" option */}
      {otpSent && (
        <div className="text-center text-sm font-[500] mt-3">
          <button type="button" onClick={handleBackToPhone}>
            <span className="mr-1 text-black ">Not you?</span>
            <span className="text-red-500 underline">
              Log in with another account
            </span>
          </button>
        </div>
      )}

      {/* Sign up link */}
      {!otpSent && (
        <div className="text-center mt-4">
          <p className="text-sm" style={{ color: "var(--text-color)" }}>
            Don't have an account yet?{" "}
            <button
              type="button"
              className="font-medium underline transition-colors"
              style={{ color: "var(--primary-color)" }}
              onClick={onSwitchToSignUp}
            >
              Sign up
            </button>
          </p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
