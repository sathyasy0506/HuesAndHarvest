import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const countries = [
  { name: "India", code: "+91" },
  { name: "USA", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "Canada", code: "+1" },
  // add more countries if needed
];

const SignUpForm = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1); // 1: details, 2: OTP
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "+91",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [otp, setOtp] = useState({ emailOtp: "", phoneOtp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  // OTP timer countdown
  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, otpTimer]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOtpChange = (field, value) => {
    setOtp((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendOtp = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    setOtpSent(true);
    setOtpTimer(60);
    setStep(2); // move to OTP verification
    alert(
      `OTP sent to Email: ${formData.email} and Phone: ${formData.country} ${formData.phone}`
    );
  };

  const handleResendOtp = () => {
    setOtpTimer(60);
    alert(
      `OTP resent to Email: ${formData.email} and Phone: ${formData.country} ${formData.phone}`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Account created successfully!");
      // Reset form
      setStep(1);
      setOtpSent(false);
      setOtp({ emailOtp: "", phoneOtp: "" });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        country: "+91",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    }, 1000);
  };

  return (
    <form className="space-y-6 font-outfit max-w-md mx-auto">
      {step === 1 && (
        <>
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            {["First Name", "Last Name"].map((label) => {
              const key = label === "First Name" ? "firstName" : "lastName";
              return (
                <div key={key}>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-color)" }}
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    value={formData[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    placeholder={label}
                    required
                    className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
                    style={{
                      borderColor: "var(--primary-color)",
                      backgroundColor: "var(--sho-bg-color)",
                      color: "var(--text-color)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-color)" }}
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
            />
          </div>

          {/* Phone with country selector */}
          <div className="flex gap-2 items-center">
            <select
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="px-3 py-3 rounded-lg transition-colors focus:outline-none"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Phone number"
              required
              className="flex-1 px-3 py-3 rounded-lg transition-colors focus:outline-none"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-color)" }}
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Password"
                required
                className="w-full px-3 py-3 pr-12 rounded-lg transition-colors focus:outline-none"
                style={{
                  borderColor: "var(--primary-color)",
                  backgroundColor: "var(--sho-bg-color)",
                  color: "var(--text-color)",
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
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
            <div className="relative">
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-color)" }}
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm password"
                required
                className="w-full px-3 py-3 pr-12 rounded-lg transition-colors focus:outline-none"
                style={{
                  borderColor: "var(--primary-color)",
                  backgroundColor: "var(--sho-bg-color)",
                  color: "var(--text-color)",
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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

          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}

          {/* Send OTP Button */}
          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          {/* OTP Inputs */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-color)" }}
            >
              Enter OTP sent to Email
            </label>
            <input
              type="text"
              value={otp.emailOtp}
              onChange={(e) => handleOtpChange("emailOtp", e.target.value)}
              placeholder="Email OTP"
              className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none mb-2"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-color)" }}
            >
              Enter OTP sent to Phone
            </label>
            <input
              type="text"
              value={otp.phoneOtp}
              onChange={(e) => handleOtpChange("phoneOtp", e.target.value)}
              placeholder="Phone OTP"
              className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none mb-2"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
            />
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span style={{ color: "var(--text-color)" }}>
              OTP expires in {otpTimer}s
            </span>
            <button
              type="button"
              disabled={otpTimer > 0}
              className={`underline ${
                otpTimer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600"
              }`}
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          </div>

          {/* Create Account Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 font-outfit ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#ffffff",
            }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </>
      )}

      {/* Switch to Login */}
      <div className="text-center mt-4">
        <p className="text-sm" style={{ color: "var(--text-color)" }}>
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium underline transition-colors"
            style={{ color: "var(--primary-color)" }}
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
