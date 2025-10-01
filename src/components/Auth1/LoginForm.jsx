import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { showToast } from "../Common/Toaster"; // import the global toaster

const LoginForm = ({ onForgotPassword, onSwitchToSignUp }) => {
  const { login } = useAuth(); // get login function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const result = await login(email, password);

    setIsLoading(false);
    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      // ✅ Show toaster on successful login
      showToast("Login successful!", "success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-outfit">
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-color)" }}
        >
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
              <Eye className="h-5 w-5" style={{ color: "var(--text-color)" }} />
            )}
          </button>
        </div>
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

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
        ) : (
          "Log In"
        )}
      </button>

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
    </form>
  );
};

export default LoginForm;
