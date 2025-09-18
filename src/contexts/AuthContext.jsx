import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../api/api"; // ✅ make sure path is correct

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Save token in localStorage
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("hh_token", newToken);
  };

  const clearToken = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("hh_token");
  };

  // Validate token on load
  const validateToken = async (storedToken) => {
    try {
      const res = await fetch(ENDPOINTS.VALIDATE(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: storedToken }),
      });
      const data = await res.json();

      if (data.success) {
        // Token is valid, refresh it
        const refreshed = await refreshToken(storedToken);
        return refreshed;
      } else {
        clearToken();
        return false;
      }
    } catch (err) {
      console.error("Token validation error:", err);
      clearToken();
      return false;
    }
  };

  // Refresh token
  const refreshToken = async (oldToken) => {
    try {
      const res = await fetch(ENDPOINTS.REFRESH(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: oldToken }),
      });
      const data = await res.json();
      if (data.success) {
        saveToken(data.token);
        setUser(data.user);
        return true;
      } else {
        clearToken();
        return false;
      }
    } catch (err) {
      console.error("Token refresh error:", err);
      clearToken();
      return false;
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await fetch(ENDPOINTS.REGISTER(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        saveToken(data.token);
        setUser(data.user);
        navigate("/");
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Registration error:", err);
      return { success: false, message: "Registration failed" };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await fetch(ENDPOINTS.LOGIN(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        saveToken(data.token);
        setUser(data.user);
        navigate("/");
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Login failed" };
    }
  };

  // Send OTP to user email
  const sendPasswordResetOtp = async (email) => {
    try {
      const res = await fetch(ENDPOINTS.FORGET_PASSWORD(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Send OTP error:", err);
      return { success: false, message: "Failed to send OTP" };
    }
  };

  // Verify OTP & reset password
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const res = await fetch(ENDPOINTS.RESET_PASSWORD(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Reset password error:", err);
      return { success: false, message: "Failed to reset password" };
    }
  };

  // Logout user
  const logout = async () => {
    if (token) {
      try {
        await fetch(ENDPOINTS.LOGOUT(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      } catch (err) {
        console.error("Logout API error:", err);
      }
    }
    clearToken();
    navigate("/auth");
  };

  // On initial load, check localStorage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("hh_token");
      if (storedToken) {
        await validateToken(storedToken);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
        loading,
        sendPasswordResetOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
