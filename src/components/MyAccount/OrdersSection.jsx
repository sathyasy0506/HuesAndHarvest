import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  RefreshCw,
} from "lucide-react";
import { ENDPOINTS } from "../../api/api";

const OrdersSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("hh_token");
      if (!token) {
        alert("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(ENDPOINTS.GET_ORDERS(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          alert(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "processing":
        return <RefreshCw className="w-5 h-5 text-yellow-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  if (loading)
    return (
      <div className="text-center py-12 text-gray-600">
        Loading your orders...
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="card-bg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {["all", "processing", "completed", "pending"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm p-6 flex justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                <p className="text-gray-500">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
                {/* <p className="text-gray-700 font-semibold">₹{order.total}</p> */}
              </div>
              <div className="flex items-center space-x-3">
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default OrdersSection;
