import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({ onForgotPassword, onSwitchToSignUp }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Flow state
  const [step, setStep] = useState("password"); // "password" | "otp"
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);

  // Countdown timer
  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, otpTimer]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password verification
    setTimeout(() => {
      setIsLoading(false);

      // Assume backend verified password successfully
      alert(`Password verified for ${emailOrPhone}. Sending OTP...`);
      setStep("otp");
      setOtpSent(true);
      setOtpTimer(60);
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      alert(`Logged in successfully with 2FA for ${emailOrPhone}`);
    }, 1000);
  };

  const handleResendOtp = () => {
    setOtpTimer(60);
    alert(`OTP resent to ${emailOrPhone}`);
  };

  const handleBackToPassword = () => {
    // Reset everything
    setStep("password");
    setEmailOrPhone("");
    setPassword("");
    setOtp("");
    setOtpSent(false);
    setOtpTimer(60);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={step === "password" ? handlePasswordSubmit : handleOtpSubmit}
      className="space-y-4 font-outfit max-w-md mx-auto"
    >
      {/* Step 1: Email + Password */}
      {step === "password" && (
        <>
          {/* Email/Phone */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-color)" }}
            >
              Email or Phone
            </label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
              placeholder="Enter email or phone"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                className="block text-sm font-medium"
                style={{ color: "var(--text-color)" }}
              >
                Password
              </label>
              <button
                type="button"
                className="text-sm transition-opacity"
                style={{ color: "var(--primary-color)" }}
                onClick={onForgotPassword}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 pr-12 rounded-lg transition-colors focus:outline-none"
                style={{
                  borderColor: "var(--primary-color)",
                  backgroundColor: "var(--sho-bg-color)",
                  color: "var(--text-color)",
                }}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff
                    className="h-5 w-5"
                    style={{ color: "var(--text-color)" }}
                  />
                ) : (
                  <Eye
                    className="h-5 w-5"
                    style={{ color: "var(--text-color)" }}
                  />
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Step 2: OTP Verification */}
      {step === "otp" && (
        <div>
          <p className="text-sm mb-4 text-center font-medium text-green-600">
            OTP sent to <span className="">{emailOrPhone}</span>
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
        ) : step === "password" ? (
          "Log In"
        ) : (
          "Verify OTP"
        )}
      </button>

      {/* "Not you?" option */}
      {step === "otp" && (
        <div className="text-center text-sm font-[500] mt-3">
          <button type="button" onClick={handleBackToPassword}>
            <span className="mr-1 text-black ">Not you?</span>
            <span className="text-red-500 underline">
              Log in with another account
            </span>
          </button>
        </div>
      )}

      {/* Sign up link */}
      {step === "password" && (
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
