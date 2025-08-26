import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgetPasswordForm";
import Silk from "../Home/Silk"; // your silk component
import Logo from "../../assets/images/form.png";

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // login | signup | forgot
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    if (mode === "login") console.log("Login", formData);
    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("SignUp", formData);
    }
    if (mode === "forgot") {
      alert("Password reset link sent to " + formData.email);
    }
  };

  return (
    <div className="relative min-h-screen -mt-16 pt-16">
      {/* Silk Background */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={5}
          scale={1.2}
          color="#234541"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Auth Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div
          className="w-full max-w-md rounded-2xl border p-8 shadow-sm"
          style={{
            backgroundColor: "var(--card-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <img src={Logo} alt="Logo" className="mx-auto w-52 mb-2" />
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--text-color)" }}
            >
              {mode === "login"
                ? "Login"
                : mode === "signup"
                ? "Sign Up"
                : "Forgot Password"}
            </h1>
          </div>

          {mode === "login" && (
            <>
              <LoginForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                isLoading={isLoading}
                onForgotPassword={() => setMode("forgot")}
              />
              <div className="text-center mt-4">
                <p className="text-sm" style={{ color: "var(--text-color)" }}>
                  Don't have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-medium underline transition-colors"
                    style={{
                      color: "var(--primary-color)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--hover-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--primary-color)")
                    }
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </>
          )}

          {mode === "signup" && (
            <>
              <SignUpForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                isLoading={isLoading}
              />
              <div className="text-center mt-4">
                <p className="text-sm" style={{ color: "var(--text-color)" }}>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-medium underline transition-colors"
                    style={{
                      color: "var(--primary-color)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--hover-color)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--primary-color)")
                    }
                  >
                    Login
                  </button>
                </p>
              </div>
            </>
          )}

          {mode === "forgot" && (
            <ForgotPasswordForm
              email={formData.email}
              setEmail={(value) => handleInputChange("email", value)}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              onBack={() => setMode("login")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
