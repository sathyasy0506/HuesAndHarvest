// Signup.jsx
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Firebase config
const firebaseConfig = {
  //   apiKey: "YOUR_API_KEY",
  //   authDomain: "YOUR_PROJECT.firebaseapp.com",
  //   projectId: "YOUR_PROJECT",
  //   storageBucket: "YOUR_PROJECT.appspot.com",
  //   messagingSenderId: "YOUR_SENDER_ID",
  //   appId: "YOUR_APP_ID",

  apiKey: "AIzaSyBsLe3I2wuUCkIp4sZnkF8FvS7WpEpqBDo",
  authDomain: "huesharvestapp.firebaseapp.com",
  projectId: "huesharvestapp",
  storageBucket: "huesharvestapp.firebasestorage.app",
  messagingSenderId: "269734416605",
  appId: "1:269734416605:web:328b282debb3088802cb34",
  measurementId: "G-YS7WXR2Y93",
};

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

  // --- Send OTP ---
  const sendOTP = () => {
    // Initialize Recaptcha only once
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
    }

    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((result) => {
        setConfirmationResult(result);
        alert("OTP sent!");
      })
      .catch((err) => alert(err.message));
  };

  // --- Verify OTP ---
  const verifyOTP = async () => {
    if (!confirmationResult) return alert("Send OTP first");
    try {
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

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
      alert(data.success ? "Signup Successful!" : data.message);
    } catch (err) {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Signup with Phone OTP</h2>

      <input
        className="w-full p-2 border rounded"
        placeholder="First Name"
        value={userData.first_name}
        onChange={(e) =>
          setUserData({ ...userData, first_name: e.target.value })
        }
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Last Name"
        value={userData.last_name}
        onChange={(e) =>
          setUserData({ ...userData, last_name: e.target.value })
        }
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Password"
        type="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Confirm Password"
        type="password"
        value={userData.confirm_password}
        onChange={(e) =>
          setUserData({ ...userData, confirm_password: e.target.value })
        }
      />

      <input
        className="w-full p-2 border rounded"
        placeholder="+91xxxxxxxxxx"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <div id="recaptcha-container"></div>

      <button
        className="w-full bg-green-600 text-white py-2 rounded"
        onClick={sendOTP}
      >
        Send OTP
      </button>

      <input
        className="w-full p-2 border rounded"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded"
        onClick={verifyOTP}
      >
        Verify & Signup
      </button>
    </div>
  );
};

export default Signup;
