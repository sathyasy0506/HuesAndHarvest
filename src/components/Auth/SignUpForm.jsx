import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { showToast } from "../Common/Toaster";

const SignUpForm = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1); // Step 1 = Request OTP, Step 2 = Verify OTP
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    otpPhone: "",
    otpEmail: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      showToast("All fields are required", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setIsLoading(true);

    try {
      const res = await fetch("https://admin.huesandharvest.com/api/rso.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        showToast("OTP sent to phone and email", "success");
        setStep(2);
      } else {
        setErrorMessage(data.message);
        showToast(data.message, "error");
      }
    } catch (err) {
      setIsLoading(false);
      showToast("Something went wrong", "error");
      console.error(err);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!formData.otpPhone || !formData.otpEmail) {
      showToast("Please enter both OTPs", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("https://admin.huesandharvest.com/api/rvo.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          password: formData.password,
          otp_phone: formData.otpPhone,
          otp_email: formData.otpEmail,
        }),
      });
      const data = await res.json();
      setIsLoading(false);

      if (data.success) {
        showToast("Registration successful!", "success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          otpPhone: "",
          otpEmail: "",
        });
        onSwitchToLogin();
      } else {
        setErrorMessage(data.message);
        showToast(data.message, "error");
      }
    } catch (err) {
      setIsLoading(false);
      showToast("Something went wrong", "error");
      console.error(err);
    }
  };

  const renderInput = (
    label,
    type,
    name,
    value,
    placeholder,
    showToggle,
    toggleState,
    setToggle
  ) => (
    <div className="relative">
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: "var(--text-color)" }}
      >
        {label}
      </label>
      <input
        type={showToggle && toggleState ? "text" : type}
        value={value}
        onChange={(e) => handleInputChange(name, e.target.value)}
        placeholder={placeholder}
        required
        className="w-full px-3 py-3 pr-12 rounded-lg transition-colors focus:outline-none"
        style={{
          borderColor: "var(--primary-color)",
          backgroundColor: "var(--sho-bg-color)",
          color: "var(--text-color)",
        }}
      />
      {showToggle && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center mt-4"
          onClick={() => setToggle(!toggleState)}
        >
          {toggleState ? (
            <EyeOff
              className="h-5 w-5"
              style={{ color: "var(--text-color)" }}
            />
          ) : (
            <Eye className="h-5 w-5" style={{ color: "var(--text-color)" }} />
          )}
        </button>
      )}
    </div>
  );

  return (
    <form className="space-y-6 font-outfit">
      {step === 1 && (
        <>
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

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-color)" }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
              style={{
                borderColor: "var(--primary-color)",
                backgroundColor: "var(--sho-bg-color)",
                color: "var(--text-color)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {renderInput(
              "Password",
              "password",
              "password",
              formData.password,
              "Password",
              true,
              showPassword,
              setShowPassword
            )}
            {renderInput(
              "Confirm Password",
              "password",
              "confirmPassword",
              formData.confirmPassword,
              "Confirm password",
              true,
              showConfirmPassword,
              setShowConfirmPassword
            )}
          </div>

          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            onClick={handleRequestOTP}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 ${
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
              "Send OTP"
            )}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p
            className="text-sm text-center"
            style={{ color: "var(--text-color)" }}
          >
            Enter the OTPs sent to your email and phone
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-color)" }}
              >
                OTP (Phone)
              </label>
              <input
                type="text"
                value={formData.otpPhone}
                onChange={(e) => handleInputChange("otpPhone", e.target.value)}
                placeholder="Enter phone OTP"
                required
                className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
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
                OTP (Email)
              </label>
              <input
                type="text"
                value={formData.otpEmail}
                onChange={(e) => handleInputChange("otpEmail", e.target.value)}
                placeholder="Enter email OTP"
                required
                className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
                style={{
                  borderColor: "var(--primary-color)",
                  backgroundColor: "var(--sho-bg-color)",
                  color: "var(--text-color)",
                }}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 ${
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
              "Verify OTP & Register"
            )}
          </button>
        </>
      )}

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
