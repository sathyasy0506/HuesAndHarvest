import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// --- Firebase config ---
const firebaseConfig = {
  apiKey: "AIzaSyBsLe3I2wuUCkIp4sZnkF8FvS7WpEpqBDo",
  authDomain: "huesharvestapp.firebaseapp.com",
  projectId: "huesharvestapp",
  storageBucket: "huesharvestapp.firebasestorage.app",
  messagingSenderId: "269734416605",
  appId: "1:269734416605:web:328b282debb3088802cb34",
  measurementId: "G-YS7WXR2Y93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // --- Initialize reCAPTCHA once ---
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved
            console.log("reCAPTCHA solved", response);
          },
        },
        auth
      );
      window.recaptchaVerifier.render();
    }
  }, []);

  // --- Send OTP ---
  const sendOTP = () => {
    if (!phone) return alert("Enter phone number with country code +91...");

    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((result) => {
        setConfirmationResult(result);
        alert("OTP sent successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send OTP: " + err.message);
      });
  };

  // --- Verify OTP and call backend ---
  const verifyOTP = async () => {
    if (!confirmationResult) return alert("Send OTP first");
    if (!otp) return alert("Enter OTP");

    try {
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      // Call backend
      const res = await fetch("https://admin.huesandharvest.com/api/fbr.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          phone_number: firebaseUser.phoneNumber,
          ...userData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Signup Successful!");
        console.log(data);
      } else {
        alert("Signup failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Signup with Phone OTP</h2>

      <div className="space-y-2">
        <input
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="First Name"
          value={userData.first_name}
          onChange={(e) =>
            setUserData({ ...userData, first_name: e.target.value })
          }
        />
        <input
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Last Name"
          value={userData.last_name}
          onChange={(e) =>
            setUserData({ ...userData, last_name: e.target.value })
          }
        />
        <input
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <input
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          type="password"
          placeholder="Confirm Password"
          value={userData.confirm_password}
          onChange={(e) =>
            setUserData({ ...userData, confirm_password: e.target.value })
          }
        />
        <input
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="+91xxxxxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div id="recaptcha-container"></div>

      <button
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        onClick={sendOTP}
      >
        Send OTP
      </button>

      <input
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        onClick={verifyOTP}
      >
        Verify & Signup
      </button>
    </div>
  );
};

export default Signup;
