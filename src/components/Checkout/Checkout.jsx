import React, { useState, useEffect } from "react";
import { ShoppingBag, Lock, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ENDPOINTS } from "../../api/api";

const Checkout = () => {
  const location = useLocation();
  const {
    items = [],
    totals = { subtotal: "0.00", total: "0.00" },
    cartWeight = 0,
  } = location.state || {};

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    paymentMethod: "razorpay",
  });

  const [errors, setErrors] = useState({});

  // Prefill user email
  useEffect(() => {
    const fetchUserEmail = async () => {
      const token = localStorage.getItem("hh_token");
      if (!token) return;

      try {
        const res = await fetch(ENDPOINTS.PROFILE(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success && data.user?.email) {
          setFormData((prev) => ({ ...prev, email: data.user.email }));
        }
      } catch (err) {
        console.error("Error fetching user email:", err);
      }
    };

    fetchUserEmail();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  // 🪄 Razorpay Payment Handler
  const handlePayment = async () => {
    const token = localStorage.getItem("hh_token");
    if (!token) {
      alert("Please log in before proceeding to payment.");
      return;
    }

    try {
      // Step 1: Create order in backend
      const res = await fetch(ENDPOINTS.CREATE_RAZORPAY_ORDER(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totals.total }),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Failed to initiate payment");
        return;
      }

      // Step 2: Configure Razorpay Checkout
      const options = {
        key: "rzp_test_RZC0xunp2TupSo", // Replace with your Razorpay Key ID
        amount: data.amount * 100,
        currency: data.currency,
        name: "Hues & Harvest",
        description: "Order Payment",
        order_id: data.order_id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#4CAF50" },
        handler: async function (response) {
          // Step 3: Verify payment
          const verifyRes = await fetch(ENDPOINTS.VERIFY_RAZORPAY_PAYMENT(), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderData: { items, totals, formData },
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("✅ Payment successful! Your order has been placed.");
          } else {
            alert("❌ Payment verification failed: " + verifyData.message);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while initiating payment.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <ShoppingBag className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-3">
            <form className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  />
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country/Region *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value="India"
                    readOnly
                    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white border-gray-300"
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.item_key}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ₹{item.subtotal}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Weight</span>
                  <span>{cartWeight} g</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>₹{totals.total}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Lock className="h-5 w-5" />
                <span>Proceed to Payment</span>
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
