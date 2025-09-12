import React, { useEffect, useState } from "react";
import { Minus, Plus, X, Shield, CreditCard, Truck } from "lucide-react";
import Gradient from "../Background/Gradient";

const BASE_URL = "https://admin.huesandharvest.com/api";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: "0.00", total: "0.00" });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("hh_token"); // 🔑 Make sure you store token after login

  // Fetch Cart
  const fetchCart = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cart.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
        setTotals(data.totals);
      } else {
        console.error("Cart fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  // ✅ Update Quantity
  const updateQuantity = async (productId, action) => {
    let newItems;

    // 1️⃣ Optimistic update in React state
    setItems((prevItems) => {
      newItems = prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
              subtotal: (
                parseFloat(item.price) *
                (action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1))
              ).toFixed(2),
            }
          : item
      );
      return newItems;
    });

    // 2️⃣ Optimistically update totals
    setTotals(() => {
      let newSubtotal = newItems.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.price),
        0
      );
      return {
        subtotal: newSubtotal.toFixed(2),
        total: newSubtotal.toFixed(2),
      };
    });

    // 3️⃣ Update backend immediately
    try {
      const res = await fetch(`${BASE_URL}/product_quantity.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, product_id: productId, action }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error("❌ Backend update failed:", data.message);
        fetchCart(); // fallback → refresh from server
      }
    } catch (err) {
      console.error("⚠️ API error:", err);
      fetchCart();
    }
  };

  // ✅ Remove Item
  const removeItem = async (itemKey) => {
    let newItems;

    // 1️⃣ Optimistic remove
    setItems((prevItems) => {
      newItems = prevItems.filter((item) => item.item_key !== itemKey);
      return newItems;
    });

    // 2️⃣ Optimistically update totals
    setTotals(() => {
      let newSubtotal = newItems.reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.price),
        0
      );
      return {
        subtotal: newSubtotal.toFixed(2),
        total: newSubtotal.toFixed(2),
      };
    });

    // 3️⃣ Update backend immediately
    try {
      const res = await fetch(`${BASE_URL}/removecart.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, item_key: itemKey }),
      });

      const data = await res.json();
      if (!data.success) {
        console.error("❌ Remove failed:", data.message);
        fetchCart(); // fallback refresh
      }
    } catch (err) {
      console.error("⚠️ Remove error:", err);
      fetchCart();
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <Gradient>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-semibold">Loading cart...</p>
        </div>
      </Gradient>
    );
  }

  return (
    <Gradient>
      <div className="min-h-screen pt-12 bg-transparent text-primary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-12 sm:mt-16">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-12 py-20 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-outfit">
                Your Cart is Empty
              </h2>
              <p className="mb-6 opacity-70 text-sm sm:text-base">
                Looks like you haven’t added anything to your cart yet.
              </p>
              <button
                className="px-6 py-3 rounded-2xl font-semibold shadow-lg primary-button"
                onClick={() => (window.location.href = "/shop")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items Section */}
              <div className="lg:col-span-2">
                <div className="rounded-3xl overflow-hidden card-bg">
                  <div className="p-6 sm:p-8 gradient-header text-white">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-outfit">
                      Shopping Cart
                    </h1>
                    <p className="opacity-70 text-sm sm:text-base">
                      Secure checkout with 256-bit SSL encryption
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 cards-bg">
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div
                          key={item.item_key}
                          className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border border-card-color border-[0.5px] cards-bg"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-md mx-auto sm:mx-0"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg sm:text-xl font-semibold font-outfit">
                                {item.title}
                              </h3>
                              <button
                                onClick={() => removeItem(item.item_key)}
                                className="p-1 hover:text-error-color"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
                              <div className="flex items-center border-2 rounded-xl border-card-color w-fit mx-auto sm:mx-0">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, "decrease")
                                  }
                                  className="p-2 sm:p-3 hover:bg-accent-hover rounded-l-xl"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, "increase")
                                  }
                                  className="p-2 sm:p-3 hover:bg-accent-hover rounded-r-xl"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-center sm:text-right">
                                <p className="text-xl sm:text-2xl font-bold">
                                  ₹{item.subtotal}
                                </p>
                                <p className="opacity-70 text-sm sm:text-base">
                                  ₹{item.price} each
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm sm:text-base">
                      <Shield className="w-5 h-5 text-dark-gold-color" />
                      <span>Secure Payment</span>
                      <CreditCard className="w-5 h-5" />
                      <span>Multiple Payment Options</span>
                      <Truck className="w-5 h-5" />
                      <span>Free Shipping</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1">
                <div className="rounded-3xl shadow-xl p-6 sm:p-8 sticky top-4 card-bg">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 font-outfit">
                    Order Summary
                  </h2>

                  <div className="space-y-3 sm:space-y-4 mb-8 text-sm sm:text-base">
                    <div className="flex justify-between opacity-80">
                      <span>Subtotal ({items.length} items)</span>
                      <span className="font-semibold">₹{totals.subtotal}</span>
                    </div>

                    <hr className="border-card-color" />
                    <div className="flex justify-between text-lg sm:text-2xl font-bold">
                      <span>Total</span>
                      <span>₹{totals.total}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg mb-4 shadow-lg primary-button">
                    Proceed to Secure Checkout
                  </button>

                  <button
                    className="w-full py-2 sm:py-3 rounded-2xl secondary-button mb-4"
                    onClick={() => (window.location.href = "/shop")}
                  >
                    Continue Shopping
                  </button>

                  <div className="mt-4 sm:mt-6 p-4 rounded-xl cards-bg">
                    <div className="flex items-center gap-2 text-xs sm:text-sm opacity-70">
                      <Shield className="w-4 h-4 text-dark-gold-color" />
                      <span>
                        Your payment information is protected by 256-bit SSL
                        encryption
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Gradient>
  );
};

export default Cart;
