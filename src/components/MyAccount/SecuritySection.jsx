import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👁️ Icons for show/hide password
import { showToast } from "../Common/Toaster";
import { ENDPOINTS } from "../../api/api";

const SecuritySection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ OTP Timer
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // ✅ Show/Hide Passwords
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Run countdown
  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  // ✅ Step 1: Request OTP
  const handleRequestOtp = async (isResend = false) => {
    if (!isResend && newPassword !== confirmPassword) {
      showToast("New passwords do not match!", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(ENDPOINTS.REQUEST_PASSWORD_OTP(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("hh_token")}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsOtpSent(true);
        setTimer(60); // 60 seconds timer
        setCanResend(false);
        showToast(`OTP sent to ${data.email}`, "success");
      } else {
        showToast(data.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
    }
    setIsLoading(false);
  };

  // ✅ Step 2: Verify OTP & Reset Password
  const handleVerifyOtpAndChangePassword = async () => {
    if (!otp.trim()) {
      showToast("Please enter OTP", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(ENDPOINTS.VERIFY_PASSWORD_OTP(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("hh_token")}`,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (data.success) {
        showToast("Password updated successfully!", "success");
        setIsChanging(false);
        setIsOtpSent(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setOtp("");
      } else {
        showToast(
          data.message || "Invalid OTP or error updating password",
          "error"
        );
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="card-bg rounded-2xl p-8">
        <h1
          className="text-3xl font-bold primary-text mb-6"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Security Settings
        </h1>
        <div className="space-y-6">
          {/* Login Alerts */}
          <div
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ border: "1px solid var(--border-color)" }}
          >
            <div>
              <h3 className="font-semibold primary-text">Login Alerts</h3>
              <p className="muted-text">
                Get notified when someone logs into your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div
                className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
                style={{ backgroundColor: "var(--border-color)" }}
              ></div>
            </label>
          </div>

          {/* Change Password with OTP */}
          <div
            className="p-4 rounded-xl space-y-4"
            style={{ border: "1px solid var(--border-color)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold primary-text">Change Password</h3>
                <p className="muted-text">
                  Update your password to keep your account secure
                </p>
              </div>
              <button
                onClick={() => setIsChanging(!isChanging)}
                className="primary-button px-4 py-2 rounded-lg"
              >
                {isChanging ? "Cancel" : "Change"}
              </button>
            </div>

            {isChanging && (
              <div className="space-y-4 mt-4">
                {!isOtpSent ? (
                  <>
                    {/* Current Password */}
                    <div className="relative">
                      <label className="block text-sm font-medium primary-text mb-2">
                        Current Password
                      </label>
                      <input
                        type={showPassword.current ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full input-field px-4 py-3 rounded-xl transition-colors pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            current: !prev.current,
                          }))
                        }
                        className="absolute right-3 top-9 text-gray-500"
                      >
                        {showPassword.current ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                      <label className="block text-sm font-medium primary-text mb-2">
                        New Password
                      </label>
                      <input
                        type={showPassword.new ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full input-field px-4 py-3 rounded-xl transition-colors pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                        className="absolute right-3 top-9 text-gray-500"
                      >
                        {showPassword.new ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <label className="block text-sm font-medium primary-text mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full input-field px-4 py-3 rounded-xl transition-colors pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                        className="absolute right-3 top-9 text-gray-500"
                      >
                        {showPassword.confirm ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setIsChanging(false)}
                        className="secondary-button px-6 py-3 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleRequestOtp(false)}
                        className="primary-button px-6 py-3 rounded-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending OTP..." : "Send OTP"}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Enter OTP */}
                    <div>
                      <label className="block text-sm font-medium primary-text mb-2">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full input-field px-4 py-3 rounded-xl transition-colors"
                      />
                      <p className="text-sm muted-text mt-1">
                        {timer > 0
                          ? `OTP will expire in ${timer}s`
                          : "OTP expired, please resend"}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {canResend && (
                        <button
                          onClick={() => handleRequestOtp(true)}
                          className="text-sm text-blue-500 underline"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <div className="flex justify-end space-x-4 mt-4">
                      <button
                        onClick={() => setIsOtpSent(false)}
                        className="secondary-button px-6 py-3 rounded-xl"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleVerifyOtpAndChangePassword}
                        className="primary-button px-6 py-3 rounded-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? "Verifying..." : "Verify & Update"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
