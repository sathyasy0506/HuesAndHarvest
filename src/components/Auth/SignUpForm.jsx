import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const countries = [
  { name: "India", code: "+91" },
  { name: "USA", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "Canada", code: "+1" },
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

  // Send OTP request to PHP backend
  const handleSendOtp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    setIsLoading(true);

    try {
      const res = await fetch("https://admin.huesandharvest.com/api/frso.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setOtpTimer(60);
        setStep(2); // move to OTP step
        alert(data.message);
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

  const handleResendOtp = () => {
    setOtpTimer(60);
    alert(`OTP resent to ${formData.email} & ${formData.phone}`);
  };

  // Final submit: verify OTPs + create account
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("https://admin.huesandharvest.com/api/frvo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: formData.phone,
          email: formData.email,
          otp_phone: otp.phoneOtp,
          otp_email: otp.emailOtp,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });
      const data = await res.json();

      if (data.success) {
        // ✅ Save JWT token in localStorage
        localStorage.setItem("hh_token", data.token);
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
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while verifying OTP");
    } finally {
      setIsLoading(false);
    }
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
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
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
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
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
                  <EyeOff className="h-5 w-5" style={{ color: "var(--text-color)" }} />
                ) : (
                  <Eye className="h-5 w-5" style={{ color: "var(--text-color)" }} />
                )}
              </button>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
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
                  <EyeOff className="h-5 w-5" style={{ color: "var(--text-color)" }} />
                ) : (
                  <Eye className="h-5 w-5" style={{ color: "var(--text-color)" }} />
                )}
              </button>
            </div>
          </div>

          {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

          {/* Send OTP Button */}
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          {/* OTP Inputs */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
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
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
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
                otpTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
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
            disabled={isLoading}
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
