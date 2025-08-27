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
    <div className="min-h-screen bg-gray-50 mt-4">
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
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">{i}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              Notification Title {i}
            </h3>
            <p className="text-gray-600 mt-1">
              This is a sample notification message that would appear here.
            </p>
            <p className="text-sm text-gray-500 mt-2">2 hours ago</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SecurityPlaceholder = ({ title }) => (
  <div className="space-y-8">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
          <div>
            <h3 className="font-semibold text-gray-900">
              Two-Factor Authentication
            </h3>
            <p className="text-gray-600">
              Add an extra layer of security to your account
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Enable
          </button>
        </div>
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
          <div>
            <h3 className="font-semibold text-gray-900">Login Alerts</h3>
            <p className="text-gray-600">
              Get notified when someone logs into your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const SettingsPlaceholder = ({ title }) => (
  <div className="space-y-8">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Email Preferences
          </h3>
          <div className="space-y-3">
            {[
              "Order updates",
              "Promotional emails",
              "Product recommendations",
            ].map((item) => (
              <label key={item} className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-3 text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Language & Region
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <select className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Order Issues", desc: "Problems with your orders" },
          { title: "Returns & Refunds", desc: "Return or exchange items" },
          { title: "Account Settings", desc: "Manage your account" },
          { title: "Contact Support", desc: "Get in touch with our team" },
        ].map((item) => (
          <div
            key={item.title}
            className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AccountDashboard;
