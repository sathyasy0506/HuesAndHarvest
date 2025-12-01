import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Lock } from "lucide-react";
import { ENDPOINTS } from "../../api/api";
import LoaderCircle from "./LoaderCircle";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], cartWeight = 0, source = "cart" } = location.state || {};
  const [totals, setTotals] = useState(
    location.state?.totals || { subtotal: "0.00", total: "0.00" }
  );
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
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [shippingCharge, setShippingCharge] = useState(0);

  // 🧠 Auto-fill user email if logged in
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

  // Ensure totals have shipping if available on mount/when totals change
  useEffect(() => {
    // if shippingCharge already set, update totals accordingly
    if (shippingCharge) {
      setTotals((prev) => ({
        ...prev,
        shipping: shippingCharge,
        total: (
          parseFloat(prev.subtotal || 0) + parseFloat(shippingCharge || 0)
        ).toFixed(2),
      }));
    }
  }, [shippingCharge]);

  // 🧾 Handle Form Change
  const handleInputChange = (e, isShipping = false) => {
    const { name, value } = e.target;
    const targetState = isShipping ? setShippingData : setFormData;

    if (name === "pinCode") {
      const numericValue = value.replace(/\D/g, "").slice(0, 6);
      targetState((prev) => ({ ...prev, pinCode: numericValue }));
      if (numericValue.length === 6) {
        fetchPincodeDetails(numericValue, isShipping);
        // getShippingRate intentionally still called here, but the implementation
        // now uses a fixed shipping charge (see getShippingRate implementation).
        getShippingRate(numericValue); // 🟢 now sets a fixed charge (40)
      }
      return;
    }

    targetState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 📍 Fetch City/State by PIN
  const fetchPincodeDetails = async (pincode, isShipping = false) => {
    try {
      const res = await fetch(ENDPOINTS.PINCODE(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode }),
      });
      const data = await res.json();
      if (data.status === "success") {
        const update = {
          city: data.city || "",
          state: data.state || "",
        };
        if (isShipping) setShippingData((prev) => ({ ...prev, ...update }));
        else setFormData((prev) => ({ ...prev, ...update }));
      }
    } catch (error) {
      console.error("Error fetching pincode details:", error);
    }
  };

  // 🚚 Get Real Shiprocket Shipping Charge
  // NOTE: As requested, commenting out the real endpoint call and using a fixed charge of ₹40 for now.
  const getShippingRate = async (pincode) => {
    try {
      // --- ORIGINAL SHIPROCKET CALL COMMENTED OUT ---
      // const res = await fetch(
      //   "https://admin.huesandharvest.com/api/shiprocket/api/shipping_estimate.php",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       delivery_postcode: pincode,
      //       weight: cartWeight / 1000, // grams → kg
      //       length: items[0]?.length_in || 10,
      //       breadth: items[0]?.width_in || 10,
      //       height: items[0]?.breadth_in || 10,
      //       cod: 0,
      //     }),
      //   }
      // );
      // const data = await res.json();
      // if (data.success) {
      //   setShippingCharge(parseFloat(data.shipping_charge));
      //   setTotals((prev) => ({
      //     ...prev,
      //     shipping: data.shipping_charge,
      //     total: (
      //       parseFloat(prev.subtotal) + parseFloat(data.shipping_charge)
      //     ).toFixed(2),
      //   }));
      // }

      // --- TEMPORARY FIXED CHARGE ---
      const fixedCharge = 2; // ₹40 fixed shipping charge as requested
      setShippingCharge(parseFloat(fixedCharge));
      setTotals((prev) => ({
        ...prev,
        shipping: fixedCharge,
        total: (
          parseFloat(prev.subtotal || 0) + parseFloat(fixedCharge)
        ).toFixed(2),
      }));
    } catch (error) {
      console.error("Error getting shipping rate (using fixed charge):", error);
      // still set fixed fallback
      const fixedCharge = 40;
      setShippingCharge(parseFloat(fixedCharge));
      setTotals((prev) => ({
        ...prev,
        shipping: fixedCharge,
        total: (
          parseFloat(prev.subtotal || 0) + parseFloat(fixedCharge)
        ).toFixed(2),
      }));
    }
  };

  // -------- Validation: all fields required before payment ----------
  const validateForm = () => {
    const newErrors = {};
    // basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // required billing fields
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pinCode || formData.pinCode.length !== 6)
      newErrors.pinCode = "6-digit PIN code is required";
    if (!formData.phone || formData.phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Valid phone number is required";

    // shipping fields if not same as billing
    if (!sameAsBilling) {
      if (!shippingData.firstName)
        newErrors.shipping_firstName = "First name is required";
      if (!shippingData.lastName)
        newErrors.shipping_lastName = "Last name is required";
      if (!shippingData.address)
        newErrors.shipping_address = "Address is required";
      if (!shippingData.city) newErrors.shipping_city = "City is required";
      if (!shippingData.state) newErrors.shipping_state = "State is required";
      if (!shippingData.pinCode || shippingData.pinCode.length !== 6)
        newErrors.shipping_pinCode = "6-digit PIN code is required";
      if (
        !shippingData.phone ||
        shippingData.phone.replace(/\D/g, "").length < 10
      )
        newErrors.shipping_phone = "Valid phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 💳 Razorpay Payment Flow
  const handlePayment = async () => {
    const token = localStorage.getItem("hh_token");
    if (!token) {
      setLoadingStatus({ status: "error", text: "Please log in to continue" });
      setTimeout(() => setLoadingStatus(null), 1500);
      return;
    }

    // Validate all required inputs before proceeding
    if (!validateForm()) {
      setLoadingStatus({
        status: "error",
        text: "Please fill all required fields",
      });
      setTimeout(() => setLoadingStatus(null), 1800);
      return;
    }

    setLoadingStatus({ status: "loading", text: "Processing Payment..." });

    try {
      const res = await fetch(ENDPOINTS.CREATE_RAZORPAY_ORDER(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totals.total }),
      });

      const data = await res.json();
      if (!data.success) {
        setLoadingStatus({
          status: "error",
          text: "Failed to initiate payment",
        });
        setTimeout(() => setLoadingStatus(null), 1500);
        return;
      }

      setLoadingStatus(null);
      const options = {
        key: "rzp_live_Ra4YRxqH9ResRW",
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
          setLoadingStatus({ status: "loading", text: "Verifying Payment..." });

          const safeItems = items.map((item) => ({
            id: item.id || item.product_id || 0,
            title: item.title,
            sku: item.sku,
            quantity: item.quantity,
            subtotal: item.subtotal,
            price: item.price,
            length_in: item.length_in || 10,
            width_in: item.width_in || 10,
            breadth_in: item.breadth_in || 10,
          }));

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
                items: safeItems,
                totals: { ...totals, shipping: shippingCharge },
                shippingCharge,
                formData,
                shippingData: sameAsBilling ? formData : shippingData,
                source,
              },
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            if (source === "cart") {
              await fetch(ENDPOINTS.CLEAR_CART(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
              });
            }

            setLoadingStatus({
              status: "success",
              text: "Order Placed Successfully!",
            });
            setTimeout(() => {
              setLoadingStatus(null);
              navigate("/account", { state: { activeSection: "orders" } });
            }, 1500);
          } else {
            setLoadingStatus({
              status: "error",
              text: "Payment Verification Failed!",
            });
            setTimeout(() => setLoadingStatus(null), 1500);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      setLoadingStatus({ status: "error", text: "Something went wrong" });
      setTimeout(() => setLoadingStatus(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {loadingStatus && (
        <LoaderCircle status={loadingStatus.status} text={loadingStatus.text} />
      )}

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <ShoppingBag className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Billing Information
              </h2>
              <BillingForm formData={formData} onChange={handleInputChange} />
              {/* show simple inline errors for billing */}
              <div className="mt-2 text-sm text-red-600">
                {errors.email && <div>{errors.email}</div>}
                {errors.firstName && <div>{errors.firstName}</div>}
                {errors.lastName && <div>{errors.lastName}</div>}
                {errors.address && <div>{errors.address}</div>}
                {errors.city && <div>{errors.city}</div>}
                {errors.state && <div>{errors.state}</div>}
                {errors.pinCode && <div>{errors.pinCode}</div>}
                {errors.phone && <div>{errors.phone}</div>}
              </div>
            </div>

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

            {!sameAsBilling && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Shipping Information
                </h2>
                <BillingForm
                  formData={shippingData}
                  onChange={(e) => handleInputChange(e, true)}
                />
                <div className="mt-2 text-sm text-red-600">
                  {errors.shipping_firstName && (
                    <div>{errors.shipping_firstName}</div>
                  )}
                  {errors.shipping_lastName && (
                    <div>{errors.shipping_lastName}</div>
                  )}
                  {errors.shipping_address && (
                    <div>{errors.shipping_address}</div>
                  )}
                  {errors.shipping_city && <div>{errors.shipping_city}</div>}
                  {errors.shipping_state && <div>{errors.shipping_state}</div>}
                  {errors.shipping_pinCode && (
                    <div>{errors.shipping_pinCode}</div>
                  )}
                  {errors.shipping_phone && <div>{errors.shipping_phone}</div>}
                </div>
              </div>
            )}
          </div>

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
                  <span>Shipping</span>
                  <span>
                    {shippingCharge ? `₹${shippingCharge}` : "Calculating..."}
                  </span>
                </div>
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

// 🧩 Billing/Shipping Form Component
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
    {/* include email field at the bottom so it's visible in billing form */}
    {Object.prototype.hasOwnProperty.call(formData, "email") !== false && (
      <Input
        label="Email *"
        name="email"
        value={formData.email}
        onChange={onChange}
      />
    )}
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
