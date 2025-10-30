import React from "react";

const OrderSummaryCard = ({ order, formatCurrency }) => {
  return (
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
            {formatCurrency(order.items.reduce((s, it) => s + it.price, 0))}
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
  );
};

export default OrderSummaryCard;
