import React, { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import ProfileSection from "./ProfileSection";
import OrdersSection from "./OrdersSection";
import AddressesSection from "./AddressesSection";
import PaymentMethodsSection from "./PaymentMethodsSection";
import WishlistSection from "./WishlistSection";

function AccountDashboard() {
  const [activeSection, setActiveSection] = useState("profile");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "orders":
        return <OrdersSection />;
      case "addresses":
        return <AddressesSection />;
      case "payments":
        return <PaymentMethodsSection />;
      case "wishlist":
        return <WishlistSection />;
      case "notifications":
        return <NotificationPlaceholder title="Notifications" />;
      case "security":
        return <SecurityPlaceholder title="Security Settings" />;
      case "settings":
        return <SettingsPlaceholder title="Account Settings" />;
      case "help":
        return <HelpPlaceholder title="Help & Support" />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen dashboard-bg mt-4">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AccountSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderActiveSection()}</div>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for sections not yet implemented
const NotificationPlaceholder = ({ title }) => (
  <div className="card-bg rounded-2xl p-8">
    <h1
      className="text-3xl font-bold primary-text mb-4"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {title}
    </h1>
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-start space-x-4 p-4 rounded-xl"
          style={{ backgroundColor: "var(--secondary-bg)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--accent-color)", opacity: 0.1 }}
          >
            <span
              className="font-semibold"
              style={{ color: "var(--accent-color)" }}
            >
              {i}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold primary-text">
              Notification Title {i}
            </h3>
            <p className="muted-text mt-1">
              This is a sample notification message that would appear here.
            </p>
            <p className="text-sm muted-text mt-2">2 hours ago</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SecurityPlaceholder = ({ title }) => (
  <div className="space-y-8">
    <div className="card-bg rounded-2xl p-8">
      <h1
        className="text-3xl font-bold primary-text mb-6"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h1>
      <div className="space-y-6">
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
      </div>
    </div>
  </div>
);

const SettingsPlaceholder = ({ title }) => (
  <div className="space-y-8">
    <div className="card-bg rounded-2xl p-8">
      <h1
        className="text-3xl font-bold primary-text mb-6"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h1>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold primary-text mb-3">Email Preferences</h3>
          <div className="space-y-3">
            {[
              "Order updates",
              "Promotional emails",
              "Product recommendations",
            ].map((item) => (
              <label key={item} className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded"
                  style={{ color: "var(--accent-color)" }}
                  defaultChecked
                />
                <span className="ml-3 primary-text">{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold primary-text mb-3">Language & Region</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="input-field px-4 py-3 rounded-xl">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <select className="input-field px-4 py-3 rounded-xl">
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HelpPlaceholder = ({ title }) => (
  <div className="space-y-8">
    <div className="card-bg rounded-2xl p-8">
      <h1
        className="text-3xl font-bold primary-text mb-6"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Order Issues", desc: "Problems with your orders" },
          { title: "Returns & Refunds", desc: "Return or exchange items" },
          { title: "Account Settings", desc: "Manage your account" },
          { title: "Contact Support", desc: "Get in touch with our team" },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl cursor-pointer transition-colors hover:opacity-80"
            style={{
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--card-color)",
            }}
          >
            <h3 className="font-semibold primary-text mb-2">{item.title}</h3>
            <p className="muted-text">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AccountDashboard;
