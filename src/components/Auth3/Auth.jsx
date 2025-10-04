import React, { useState, useEffect } from "react";
import Loader from "../Load";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgetPasswordForm";
import Silk from "../Background/Silk";
import Logo from "../../assets/images/form.png";

const AuthPage = () => {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading
    return () => clearTimeout(timer);
  }, []);

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
            <LoginForm
              onForgotPassword={() => setMode("forgot")}
              onSwitchToSignUp={() => setMode("signup")}
            />
          )}
          {mode === "signup" && (
            <SignUpForm onSwitchToLogin={() => setMode("login")} />
          )}
          {mode === "forgot" && (
            <ForgotPasswordForm onBack={() => setMode("login")} />
          )}
        </div>
      </div>

      {/* Loader overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--bg-color)]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
