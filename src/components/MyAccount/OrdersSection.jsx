import React, { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  RefreshCw,
} from "lucide-react";

const OrdersSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const orders = [
    {
      id: "#ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 299.99,
      items: 3,
      image:
        "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "#ORD-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: 149.5,
      items: 2,
      image:
        "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "#ORD-2024-003",
      date: "2024-01-08",
      status: "processing",
      total: 89.99,
      items: 1,
      image:
        "https://images.pexels.com/photos/157675/fashion-shoes-leather-shoes-mens-shoes-157675.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "#ORD-2024-004",
      date: "2024-01-05",
      status: "pending",
      total: 199.99,
      items: 2,
      image:
        "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return (
          <CheckCircle
            className="w-5 h-5"
            style={{ color: "var(--success-color)" }}
          />
        );
      case "shipped":
        return (
          <Truck className="w-5 h-5" style={{ color: "var(--accent-color)" }} />
        );
      case "processing":
        return (
          <RefreshCw
            className="w-5 h-5"
            style={{ color: "var(--warning-color)" }}
          />
        );
      case "pending":
        return <Clock className="w-5 h-5 muted-text" />;
      default:
        return <Package className="w-5 h-5 muted-text" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "success-badge";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "warning-badge";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tabs = [
    { id: "all", label: "All Orders", count: orders.length },
    {
      id: "delivered",
      label: "Delivered",
      count: orders.filter((o) => o.status === "delivered").length,
    },
    {
      id: "shipped",
      label: "Shipped",
      count: orders.filter((o) => o.status === "shipped").length,
    },
    {
      id: "processing",
      label: "Processing",
      count: orders.filter((o) => o.status === "processing").length,
    },
  ];

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-bg rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1
            className="text-3xl font-bold primary-text"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Order History
          </h1>
          <div className="flex items-center space-x-4">
            <select className="input-field px-4 py-2 rounded-lg">
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex space-x-1 rounded-xl p-1"
          style={{ backgroundColor: "var(--secondary-bg)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "card-bg shadow-sm"
                  : "hover:bg-opacity-50"
              }`}
              style={{
                color:
                  activeTab === tab.id
                    ? "var(--accent-color)"
                    : "var(--muted-text)",
              }}
            >
              <span>{tab.label}</span>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--secondary-bg)",
                  color: "var(--muted-text)",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="card-bg rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={order.image}
                  alt="Order item"
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div>
                  <h3 className="font-semibold primary-text text-lg">
                    {order.id}
                  </h3>
                  <p className="muted-text">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="muted-text">
                    {order.items} item{order.items > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-2xl font-bold primary-text">
                    ${order.total}
                  </p>
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 transition-colors rounded-lg"
                    style={{ color: "var(--muted-text)" }}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {order.status === "delivered" && (
                    <button className="primary-button px-4 py-2 rounded-lg">
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="card-bg rounded-2xl p-12 text-center">
          <Package
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "var(--muted-text)" }}
          />
          <h3 className="text-xl font-semibold primary-text mb-2">
            No orders found
          </h3>
          <p className="muted-text mb-6">
            You haven't placed any orders in this category yet.
          </p>
          <button className="primary-button px-6 py-3 rounded-xl">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
