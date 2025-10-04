import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  X,
  CreditCard,
  Package,
  Clock,
  MapPin,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/H&H.png";
import razorpay from "../../assets/images/razorpay.png";
import shiprocket from "../../assets/images/shiprocket.webp";

const OrderInitiatedModal = ({ isOpen, onClose, orderDetails }) => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 3000); // 3-second loader
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !orderDetails) return null;

  const {
    orderId,
    items = [],
    totals = { subtotal: "0.00", total: "0.00" },
    shipping = {},
  } = orderDetails;

  const currentDate = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const handleContinueShopping = () => {
    onClose();
    navigate("/shop");
  };

  return (
    <div className="fixed inset-0 z-50 animate-fadeIn">
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden animate-scaleIn">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors z-10 hover:bg-gray-100 rounded-full p-1.5"
          >
            <X size={22} />
          </button>

          {/* Loader */}
          {showLoader ? (
            <div className="flex flex-col items-center justify-center p-20">
              <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 font-medium">Processing Payment...</p>
            </div>
          ) : (
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#284B49] rounded-full blur-lg opacity-20"></div>
                  <div className="relative bg-[#284B49] rounded-full p-3 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Test Order Initiated
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    This is a test order in Razorpay sandbox mode
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Clock
                    className="text-amber-600 mt-0.5 flex-shrink-0"
                    size={18}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-amber-800 font-medium">
                      Please Wait - Test Payment Verification
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Your payment is in <strong>Razorpay test mode</strong>. No
                      real transaction has been made. Test confirmation may take
                      up to <strong>48 hours</strong>.
                      <br />
                      To create further orders and confirm your first order,
                      please wait...
                    </p>
                  </div>
                </div>
              </div>

              {/* Order + Delivery */}
              <div className="grid grid-cols-2 gap-5 mb-6">
                {/* Order Summary */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Order Summary
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Order ID</span>
                      <span className="text-sm font-bold text-gray-900">
                        {orderId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Date & Time</span>
                      <span className="text-sm font-medium text-gray-900">
                        {currentDate}
                      </span>
                    </div>
                    <div className="pb-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Items</span>
                      <div className="mt-2 space-y-1">
                        {items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm text-gray-800"
                          >
                            <span>
                              {item.title}{" "}
                              <span className="text-gray-500">
                                ×{item.quantity}
                              </span>
                            </span>
                            <span>₹{item.subtotal} </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-sm font-semibold text-gray-700">
                        Total Paid
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{totals.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                    Delivery Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={16}
                        className="text-gray-500 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <p className="text-xs text-gray-500">
                          Shipping Address
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-0.5">
                          {shipping.address}
                        </p>
                        <p className="text-sm text-gray-700">
                          {shipping.city}, {shipping.state} {shipping.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    <div className="flex items-start gap-2">
                      <Mail
                        size={16}
                        className="text-gray-500 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <p className="text-xs text-gray-500">Email Updates</p>
                        <p className="text-sm font-medium text-gray-900 mt-0.5">
                          {shipping.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment/Partner Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
                <p className="text-xs text-gray-500 text-center mb-3 font-medium">
                  TEST MODE - SANDBOX ENVIRONMENT
                </p>
                <div className="flex items-center justify-center gap-12">
                  {/* Razorpay */}
                  <div className="flex flex-col items-center">
                    <img
                      src={razorpay}
                      alt="Razorpay"
                      className="h-8 w-auto object-contain mb-1"
                    />
                    <p className="text-xs text-gray-500">Payment Partner </p>
                  </div>

                  <div className="h-10 w-px bg-gray-300"></div>

                  {/* Shiprocket */}
                  <div className="flex flex-col items-center">
                    <img
                      src={shiprocket}
                      alt="Shiprocket"
                      className="h-8 w-auto object-contain mb-1"
                    />
                    <p className="text-xs text-gray-500">Logistics Partner </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleContinueShopping}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderInitiatedModal;
