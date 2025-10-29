import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Lock } from "lucide-react";
import { ENDPOINTS } from "../../api/api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(true);
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

  // Handle input changes
  const handleInputChange = (e, isShipping = false) => {
    const { name, value } = e.target;
    const targetState = isShipping ? setShippingData : setFormData;

    if (name === "pinCode") {
      const numericValue = value.replace(/\D/g, "").slice(0, 6);
      targetState((prev) => ({ ...prev, pinCode: numericValue }));

      if (numericValue.length === 6) {
        fetchPincodeDetails(numericValue, isShipping);
      }
      return;
    }

    targetState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Fetch city/state from pincode
  const fetchPincodeDetails = async (pincode, isShipping = false) => {
    try {
      const res = await fetch(ENDPOINTS.PINCODE(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode }),
      });

      const data = await res.json();
      if (data.status === "success") {
        if (isShipping) {
          setShippingData((prev) => ({
            ...prev,
            city: data.city || "",
            state: data.state || "",
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            city: data.city || "",
            state: data.state || "",
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching pincode details:", error);
    }
  };

  // Razorpay Payment Handler
  const handlePayment = async () => {
    const token = localStorage.getItem("hh_token");
    if (!token) {
      alert("Please log in before proceeding to payment.");
      return;
    }

    try {
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

      const options = {
        key: "rzp_test_RZC0xunp2TupSo",
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
              orderData: {
                items,
                totals,
                formData,
                shippingData: sameAsBilling ? formData : shippingData,
              },
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("✅ Payment successful! Your order has been placed.");
            navigate("/account", { state: { activeSection: "orders" } });
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
          <div className="lg:col-span-3 space-y-8">
            {/* Billing Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Billing Information
              </h2>
              <BillingForm formData={formData} onChange={handleInputChange} />
            </div>

            {/* Checkbox for same as billing */}
            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
              <input
                type="checkbox"
                id="sameAsBilling"
                checked={sameAsBilling}
                onChange={() => setSameAsBilling(!sameAsBilling)}
                className="w-5 h-5 text-blue-600"
              />
              <label htmlFor="sameAsBilling" className="text-gray-700 text-sm">
                Shipping address same as billing
              </label>
            </div>

            {/* Shipping Info */}
            {!sameAsBilling && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Shipping Information
                </h2>
                <BillingForm
                  formData={shippingData}
                  onChange={(e) => handleInputChange(e, true)}
                />
              </div>
            )}
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

// Reusable Billing/Shipping Form
const BillingForm = ({ formData, onChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        label="First Name *"
        name="firstName"
        value={formData.firstName}
        onChange={onChange}
      />
      <Input
        label="Last Name *"
        name="lastName"
        value={formData.lastName}
        onChange={onChange}
      />
    </div>
    <Input label="Country/Region *" name="country" value="India" readOnly />
    <Input
      label="Address *"
      name="address"
      value={formData.address}
      onChange={onChange}
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Input
        label="PIN Code *"
        name="pinCode"
        value={formData.pinCode}
        onChange={onChange}
      />
      <Input
        label="City / Region *"
        name="city"
        value={formData.city}
        onChange={onChange}
      />
      <Input
        label="State *"
        name="state"
        value={formData.state}
        onChange={onChange}
      />
    </div>
    <Input
      label="Phone Number *"
      name="phone"
      value={formData.phone}
      onChange={onChange}
    />
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      {...props}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 ${
        props.readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

export default Checkout;
