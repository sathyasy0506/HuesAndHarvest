import React from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsSection from "./ReviewsSection";
import OrderStatusCard from "./OrderStatusCard";
import OrderItemsCard from "./OrderItemsCard";
import OrderSummaryCard from "./OrderSummaryCard"; // ✅ new import
import OrderAddressesCard from "./ OrderAddressesCard"; // ✅ new import
import Invoices from "./Invoices";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock order data
  const order = {
    id: id || "1",
    order_number: "ORD123456",
    trackingId: "H&H789456",
    date: "2025-10-28T10:30:00",
    status: "delivered",
    total: 45999,
    items: [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        image:
          "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400",
        quantity: 1,
        price: 29999,
      },
      {
        id: "2",
        name: "Smart Watch Series 8",
        image:
          "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
        quantity: 1,
        price: 16000,
      },
    ],
    shipping: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
      phone: "+91 98765 43210",
      email: "john.doe@example.com",
    },
    billing: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400001",
      phone: "+91 98765 43210",
      email: "john.doe@example.com",
    },
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
        return { accent: "emerald", label: "Delivered", icon: CheckCircle };
      case "shipped":
        return { accent: "blue", label: "Shipped", icon: Truck };
      case "processing":
        return { accent: "amber", label: "Processing", icon: Clock };
      case "pending":
      default:
        return { accent: "gray", label: "Pending", icon: Package };
    }
  };

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  const formatCurrency = (n) =>
    "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const handleBack = () => navigate("/orders");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 rounded-lg p-2 transition"
            aria-label="Back to orders"
          >
            <div className="p-1 rounded-md bg-white shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Back to orders</span>
          </button>
          <div className="pl-3 border-l border-gray-200">
            <div className="text-xs text-gray-500">Order</div>
            <div className="text-lg font-semibold">{order.order_number}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Order Status Card (matching right side cards) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-3 flex items-center justify-between min-w-[360px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-gray-100">
                <StatusIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-sm font-semibold text-gray-900">
                {statusInfo.label}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(order.date).toLocaleDateString("en-GB")}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <OrderItemsCard order={order} formatCurrency={formatCurrency} />
          <OrderStatusCard order={order} />
          <ReviewsSection />
        </div>

        {/* RIGHT */}
        <aside className="space-y-6">
          <Invoices
            onView={() => alert("Viewing invoice...")}
            onDownload={() => alert("Downloading invoice...")}
          />
          <OrderSummaryCard order={order} formatCurrency={formatCurrency} />
          <OrderAddressesCard order={order} />

          {/* Support section */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <div className="text-sm font-semibold text-gray-900">
              Need help?
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Our team is available 24/7 for order assistance.
            </p>
            <button className="mt-4 w-full py-2 rounded-lg bg-black border text-gray-100 border-gray-200 text-sm font-medium">
              Contact support
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetail;
