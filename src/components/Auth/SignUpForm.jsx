import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignUpForm = ({ formData, handleInputChange, handleSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-outfit">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="First name"
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
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Last name"
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

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
          Phone
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
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
            className="w-full px-3 py-3 pr-10 rounded-lg transition-colors focus:outline-none"
            style={{
              borderColor: "var(--primary-color)",
              backgroundColor: "var(--sho-bg-color)",
              color: "var(--text-color)",
            }}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
            className="w-full px-3 py-3 pr-10 rounded-lg transition-colors focus:outline-none"
            style={{
              borderColor: "var(--primary-color)",
              backgroundColor: "var(--sho-bg-color)",
              color: "var(--text-color)",
            }}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: "var(--primary-color)",
          color: "var(--text-color)",
        }}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Create an account"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
