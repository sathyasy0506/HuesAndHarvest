import React, { useState } from "react";

const SecuritySection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);

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
          {/* Two-Factor */}
          <div
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ border: "1px solid var(--border-color)" }}
          >
            <div>
              <h3 className="font-semibold primary-text">
                Two-Factor Authentication
              </h3>
              <p className="muted-text">
                Add an extra layer of security to your account
              </p>
            </div>
            <button className="primary-button px-4 py-2 rounded-lg">
              Enable
            </button>
          </div>

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

          {/* Change Password */}
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
                <div>
                  <label className="block text-sm font-medium primary-text mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full input-field px-4 py-3 rounded-xl transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium primary-text mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full input-field px-4 py-3 rounded-xl transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium primary-text mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full input-field px-4 py-3 rounded-xl transition-colors"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsChanging(false)}
                    className="secondary-button px-6 py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button className="primary-button px-6 py-3 rounded-xl">
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
