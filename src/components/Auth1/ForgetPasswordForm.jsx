import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPasswordForm = ({ onBack }) => {
  const { sendPasswordResetOtp, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpTimer, setOtpTimer] = useState(600); // 10 minutes
  const [resendCooldown, setResendCooldown] = useState(30); // 30 seconds before allowing resend

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (isOtpSent && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, otpTimer]);

  // Resend cooldown effect
  useEffect(() => {
    let cooldownTimer;
    if (isOtpSent && resendCooldown > 0) {
      cooldownTimer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(cooldownTimer);
  }, [isOtpSent, resendCooldown]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    const result = await sendPasswordResetOtp(email);
    setIsLoading(false);

    if (result.success) {
      setIsOtpSent(true);
      setOtpTimer(600); // reset 10 minutes
      setResendCooldown(30); // 30s cooldown
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (otpTimer <= 0) {
      setErrorMessage("OTP has expired. Please request a new one.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    const result = await resetPassword(email, otp, newPassword);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage(result.message);
      alert("Password reset successful. Please login again.");
      onBack();
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    const result = await sendPasswordResetOtp(email);
    setIsLoading(false);

    if (result.success) {
      setOtpTimer(600); // reset 10 minutes
      setResendCooldown(30); // 30s cooldown
      setSuccessMessage("OTP resent successfully.");
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <form className="space-y-6 font-outfit">
      {!isOtpSent && (
        <div className="flex flex-col gap-4">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-color)" }}
          >
            Enter your email to reset password
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
            style={{
              borderColor: "var(--primary-color)",
              backgroundColor: "var(--sho-bg-color)",
              color: "var(--text-color)",
            }}
          />
          <button
            type="submit"
            onClick={handleSendOtp}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg mt-2 flex items-center justify-center"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#ffffff",
            }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      )}

      {isOtpSent && (
        <>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm text-green-500">{successMessage}</p>
          )}

          <div className="mb-2">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-color)" }}
            >
              OTP (expires in {formatTime(otpTimer)})
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-color)" }}
            >
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
            />
          </div>

          <button
            type="submit"
            onClick={handleResetPassword}
            disabled={isLoading || otpTimer <= 0}
            className="w-full py-3 px-4 rounded-lg mt-2 flex items-center justify-center"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#ffffff",
            }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-center mt-2">
            <button
              type="button"
              disabled={resendCooldown > 0 || isLoading}
              onClick={handleResendOtp}
              className="text-sm underline hover:opacity-80 transition-opacity"
              style={{ color: "var(--primary-color)" }}
            >
              {resendCooldown > 0
                ? `Resend OTP in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <button
          type="button"
          className="text-sm underline hover:opacity-80 transition-opacity"
          style={{ color: "var(--primary-color)" }}
          onClick={onBack}
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
