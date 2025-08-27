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
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "processing":
        return <RefreshCw className="w-5 h-5 text-yellow-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-gray-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
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
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={order.image}
                  alt="Order item"
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {order.id}
                  </h3>
                  <p className="text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    {order.items} item{order.items > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${order.total}
                  </p>
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  {order.status === "delivered" && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders in this category yet.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
