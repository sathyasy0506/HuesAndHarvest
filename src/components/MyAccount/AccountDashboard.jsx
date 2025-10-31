import React, { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import ProfileSection from "./ProfileSection";
import OrdersSection from "./OrdersSection";
import AddressesSection from "./AddressesSection";
import PaymentMethodsSection from "./PaymentMethodsSection";
import WishlistSection from "./WishlistSection";
import HelpSection from "./HelpSection";
import SecuritySection from "./SecuritySection";
import { useLocation } from "react-router-dom";

function AccountDashboard() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || "profile"
  );
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
      case "help":
        return <HelpSection />;
      case "security":
        return <SecuritySection />;
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

export default AccountDashboard;
