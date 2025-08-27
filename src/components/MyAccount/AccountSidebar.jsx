import React from "react";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  Heart,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";

const AccountSidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="card-bg rounded-2xl p-6 h-fit sticky top-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 gradient-header rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3
            className="font-semibold primary-text"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            John Doe
          </h3>
          <p className="text-sm muted-text">Premium Member</p>
        </div>
      </div>

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

      <div
        className="mt-8 pt-6"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <button
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors"
          style={{ color: "var(--error-color)" }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;
