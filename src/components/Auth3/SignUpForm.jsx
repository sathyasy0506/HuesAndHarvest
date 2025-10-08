import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // path may vary
import { showToast } from "../Common/Toaster";

const SignUpForm = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    setIsLoading(true);

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    setIsLoading(false);

    if (result.success) {
      showToast("Registered successfully!", "success");
      // Optionally, you can reset the form or switch to login
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      onSwitchToLogin(); // if you want to auto-switch to login
    } else {
      setErrorMessage(result.message);
      showToast(result.message, "error");
    }
  };

  // Render function for password fields
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
    <form onSubmit={handleSubmit} className="space-y-6 font-outfit">
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

      {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <button
        type="submit"
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
          "Create an account"
        )}
      </button>

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
