import React, { useMemo } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  Home,
  FileText,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsSection from "./ReviewsSection"; // ✅ import your review component

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

  // --- Status helpers ---
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

  // --- Status steps ---
  const getStatusSteps = (currentStatus) => {
    const steps = [
      { status: "pending", label: "Order Placed", icon: Package },
      { status: "processing", label: "Confirmed", icon: Clock },
      { status: "shipped", label: "Shipped", icon: Truck },
      { status: "delivered", label: "Delivered", icon: CheckCircle },
    ];
    const orderSeq = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = orderSeq.indexOf(currentStatus);
    return steps.map((s, i) => ({
      ...s,
      completed: i <= currentIndex,
      active: i === currentIndex,
    }));
  };
  const statusSteps = getStatusSteps(order.status);

  const formatCurrency = (n) =>
    "₹" +
    n.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

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
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm">
            <div className="p-2 rounded-md bg-gray-100">
              <StatusIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-sm font-medium">{statusInfo.label}</div>
            <div className="text-xs text-gray-400 ml-2">
              • {new Date(order.date).toLocaleDateString("en-GB")}
            </div>
          </div>

          <button
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
            title="Download invoice"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Invoice</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: items + progress + reviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Items in this order
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {order.items.length} items
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Subtotal</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(
                    order.items.reduce((s, it) => s + it.price, 0)
                  )}
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex items-center gap-6">
                  <div className="w-28 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-md font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(item.price)}
                        </div>
                        <div className="text-sm text-gray-400">
                          ₹{(item.price / item.quantity).toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 flex items-center justify-between bg-gradient-to-r from-white to-gray-50 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Shipping: Free • Tax included
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(order.total)}
                </div>
              </div>
            </div>
          </div>

          {/* Tracking */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order status
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Tracking ID: {order.trackingId}
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                {new Date(order.date).toLocaleString()}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              {statusSteps.map((s) => {
                const StepIcon = s.icon;
                return (
                  <div key={s.status} className="flex-1 text-center">
                    <div
                      className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center ${
                        s.completed
                          ? "bg-gray-900 text-white"
                          : "bg-white border border-gray-200 text-gray-400"
                      } shadow-sm`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div
                      className={`mt-3 text-xs ${
                        s.completed
                          ? "text-gray-900 font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ✅ Reviews section */}
          <ReviewsSection />
        </div>

        {/* RIGHT: summary, addresses */}
        <aside className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Order total</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(order.total)}
                </div>
              </div>
              <div className="text-sm text-gray-500">Paid • Online</div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>
                  {formatCurrency(
                    order.items.reduce((s, it) => s + it.price, 0)
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">Free</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>Included</span>
              </div>
            </div>

            <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold shadow hover:opacity-95 transition">
              Track package
            </button>
          </div>
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping Address
            </h2>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <Truck className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {order.shipping.name}
                </div>
                <div className="text-sm text-gray-500">
                  {order.shipping.address}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {order.shipping.city}, {order.shipping.state}{" "}
                  {order.shipping.zip}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <div>{order.shipping.phone}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <div className="break-all">{order.shipping.email}</div>
              </div>
            </div>
          </div>
          {/* Billing Address */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Billing Address
            </h2>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <Home className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {order.billing.name}
                </div>
                <div className="text-sm text-gray-500">
                  {order.billing.address}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {order.billing.city}, {order.billing.state}{" "}
                  {order.billing.zip}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <div>{order.billing.phone}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <div className="break-all">{order.billing.email}</div>
              </div>
            </div>
          </div>
          {/* Support CTA */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <div className="text-sm font-semibold text-gray-900">
              Need help?
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Our team is available 24/7 for order assistance.
            </p>
            <button className="mt-4 w-full py-2 rounded-lg bg-black border text-gray-100 border-gray-200 text-sm  font-medium">
              Contact support
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetail;
