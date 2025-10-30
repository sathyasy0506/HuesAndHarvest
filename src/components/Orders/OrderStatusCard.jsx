import React from "react";
import { Package, Truck, CheckCircle } from "lucide-react";

const OrderStatusCard = () => {
  const order = {
    trackingId: "TRK123456789",
    date: "2025-10-25T14:32:00Z",
    status: "shipped",
    placedDate: "2025-10-23T10:00:00Z",
    shippedDate: "2025-10-25T14:32:00Z",
    deliveredDate: null,
  };

  const steps = [
    { status: "pending", label: "Order Placed", icon: Package },
    { status: "shipped", label: "Shipped", icon: Truck },
    { status: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const orderSeq = ["pending", "shipped", "delivered"];
  const currentIndex = orderSeq.indexOf(order.status);
  const progress = ((currentIndex + 1) / orderSeq.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
          <p className="text-sm text-gray-500 mt-1">
            Tracking ID: {order.trackingId}
          </p>
        </div>
        <div className="text-right text-sm text-gray-500">
          {new Date(order.date).toLocaleDateString()}
        </div>
      </div>

      {/* Steps + Progress Bar */}
      <div className="mt-6 relative">
        {/* Progress bar background */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full z-0"></div>

        {/* Progress fill */}
        <div
          className="absolute top-5 left-0 h-1 bg-gray-900 rounded-full z-0 transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>

        {/* Steps */}
        <div className="flex justify-between relative z-10">
          {steps.map((s, i) => {
            const StepIcon = s.icon;
            const completed = i <= currentIndex;
            const date =
              s.status === "pending"
                ? order.placedDate
                : s.status === "shipped"
                ? order.shippedDate
                : s.status === "delivered"
                ? order.deliveredDate
                : null;

            return (
              <div key={s.status} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    completed
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-300 text-gray-400"
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-3 text-xs ${
                    completed ? "text-gray-900 font-medium" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
                {date && (
                  <span className="text-[10px] text-gray-400 mt-1">
                    {new Date(date).toLocaleDateString()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusCard;
