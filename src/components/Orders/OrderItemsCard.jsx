import React from "react";

const OrderItemsCard = ({ order, formatCurrency }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
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
            {formatCurrency(order.items.reduce((s, it) => s + it.price, 0))}
          </div>
        </div>
      </div>

      {/* Items list */}
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

      {/* Footer */}
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
  );
};

export default OrderItemsCard;
