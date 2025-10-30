import React from "react";
import { Package, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OrdersList() {
  const navigate = useNavigate();

  const completedOrder = {
    id: "1",
    order_number: "ORD123456",
    trackingId: "H&H789456",
    date: "2025-10-28T10:30:00",
    status: "delivered",
    total: 45999,
    items: [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        image: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400",
        quantity: 1,
        price: 29999,
      },
      {
        id: "2",
        name: "Smart Watch Series 8",
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    },
  };

  const pendingOrder = {
    id: "2",
    order_number: "ORD789012",
    trackingId: "H&H456123",
    date: "2025-10-30T14:15:00",
    status: "processing",
    total: 32499,
    items: [
      {
        id: "3",
        name: "Mechanical Gaming Keyboard",
        image: "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=400",
        quantity: 1,
        price: 18999,
      },
      {
        id: "4",
        name: "Wireless Gaming Mouse",
        image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400",
        quantity: 2,
        price: 13500,
      },
    ],
    shipping: {
      name: "Jane Smith",
      address: "456 Park Avenue, Suite 12",
      city: "Delhi",
      state: "Delhi",
      zip: "110001",
      phone: "+91 87654 32109",
      email: "jane.smith@example.com",
    },
    billing: {
      name: "Jane Smith",
      address: "789 Business District",
      city: "Delhi",
      state: "Delhi",
      zip: "110002",
    },
  };

  const handleOrderClick = (order) => {
    navigate(`/orders/${order.id}`, { state: { order } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mb-4 shadow-xl">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">
            Select an order to view detailed information
          </p>
        </div>

        <div className="space-y-4">
          {/* Completed Order */}
          <div
            className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden relative"
            onClick={() => handleOrderClick(completedOrder)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      #{completedOrder.order_number}
                    </h2>
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-md">
                      Delivered
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">October 28, 2025</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {completedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">
                    {completedOrder.items.length} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{completedOrder.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Tracking:{" "}
                  <span className="font-semibold text-gray-700">
                    {completedOrder.trackingId}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Pending Order */}
          <div
            className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden relative"
            onClick={() => handleOrderClick(pendingOrder)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      #{pendingOrder.order_number}
                    </h2>
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase rounded-full shadow-md animate-pulse">
                      Processing
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">October 30, 2025</p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {pendingOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">
                    {pendingOrder.items.length} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{pendingOrder.total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Tracking:{" "}
                  <span className="font-semibold text-gray-700">
                    {pendingOrder.trackingId}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersList;