import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({ formData, handleInputChange, handleSubmit, isLoading, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-outfit">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-color)" }}>
          Email address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full px-3 py-3 rounded-lg transition-colors focus:outline-none"
          style={{
            borderColor: "var(--primary-color)",
            backgroundColor: "var(--sho-bg-color)",
            color: "var(--text-color)",
          }}
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>
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
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
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
        className="w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 font-outfit"
        style={{
          backgroundColor: "var(--primary-color)",
          color: "var(--text-color)",
        }}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Log In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
