import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  MapPin,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // ✅ adjust path if needed
import { ENDPOINTS } from "../../api/api";

const AccountSidebar = ({ activeSection, setActiveSection }) => {
  const { logout } = useAuth(); // ✅ get logout from AuthContext
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user info (same as ProfileSection)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("hh_token");
        if (!token) return;

        const res = await fetch(ENDPOINTS.PROFILE(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setUserData({
            firstName: data.user.first_name || "",
            lastName: data.user.last_name || "",
            avatar: data.user.avatar || null,
          });
        }
      } catch (err) {
        console.error("Sidebar profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "security", label: "Security", icon: Shield },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="card-bg rounded-2xl p-6 h-fit sticky top-28">
      {/* ✅ Profile section */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 gradient-header rounded-full flex items-center justify-center overflow-hidden">
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <h3
            className="font-semibold primary-text"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {loading
              ? "Loading..."
              : `${userData.firstName} ${userData.lastName}`.trim() || "User"}
          </h3>
        </div>
      </div>

      {/* ✅ Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeSection === item.id
                  ? "sidebar-item active"
                  : "sidebar-item"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ✅ Logout */}
      <div
        className="mt-8 pt-6"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors"
          style={{ color: "var(--error-color)" }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;
