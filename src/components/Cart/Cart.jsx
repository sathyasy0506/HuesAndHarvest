import React, { useState } from "react";
import { Minus, Plus, X, Shield, CreditCard, Truck } from "lucide-react";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      quantity: 1,
      color: "Black",
      rating: 4.8,
      brand: "AudioTech",
      category: "Electronics",
    },
    {
      id: "2",
      name: "Premium Coffee Mug",
      price: 24.99,
      image:
        "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      quantity: 2,
      color: "White",
      rating: 4.5,
      brand: "CoffeeCo",
      category: "Kitchen",
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      price: 34.99,
      image:
        "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
      quantity: 1,
      color: "Navy",
      size: "M",
      rating: 4.7,
      brand: "EcoWear",
      category: "Clothing",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div
      className="min-h-screen pt-12"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {items.length === 0 ? (
          // Empty Cart State
          <div
            className="flex flex-col items-center justify-center mt-12 py-20"
            style={{ color: "var(--text-color)" }}
          >
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Your Cart is Empty
            </h2>
            <p className="mb-6" style={{ opacity: 0.7 }}>
              Looks like you haven’t added anything to your cart yet.
            </p>
            <button
              className="px-6 py-3 rounded-2xl font-semibold shadow-lg"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--text-color)",
              }}
              onClick={() => {
                // Redirect to shop page
                window.location.href = "/shop"; // replace with your shop route
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Cart Items and Order Summary
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div
                className="rounded-3xl overflow-hidden shadow-xl"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <div
                  className="p-8"
                  style={{
                    background:
                      "linear-gradient(to right, var(--primary-color), var(--hover-color))",
                    color: "var(--text-color)",
                  }}
                >
                  <h1
                    className="text-3xl font-bold mb-2 "
                    style={{
                      fontFamily: "var(--font-outfit)",
                      color: "var(--white)",
                    }}
                  >
                    Shopping Cart
                  </h1>
                  <p style={{ color: "var(--sho-bg-color)" }}>
                    Secure checkout with 256-bit SSL encryption
                  </p>
                </div>

                <div className="p-8">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-6 p-6 rounded-2xl border"
                        style={{
                          backgroundColor: "var(--sho-bg-color)",
                          borderColor: "var(--card-color)",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3
                              className="text-xl font-semibold"
                              style={{
                                color: "var(--text-color)",
                                fontFamily: "var(--font-outfit)",
                              }}
                            >
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              style={{ color: "var(--text-color)" }}
                              className="p-1 hover:text-red-500"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <p
                            style={{ color: "var(--text-color)", opacity: 0.7 }}
                          >
                            {item.brand}
                          </p>
                          <p
                            style={{ color: "var(--text-color)", opacity: 0.7 }}
                          >
                            {item.color} {item.size && `• ${item.size}`}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <div
                              className="flex items-center border-2 rounded-xl"
                              style={{ borderColor: "var(--card-color)" }}
                            >
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-3 hover:bg-opacity-10 rounded-l-xl"
                                style={{
                                  backgroundColor: "var(--sho-bg-color)",
                                }}
                              >
                                <Minus
                                  className="w-4 h-4"
                                  style={{ color: "var(--text-color)" }}
                                />
                              </button>
                              <span
                                className="px-4 py-3 font-semibold"
                                style={{ color: "var(--text-color)" }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-3 hover:bg-opacity-10 rounded-r-xl"
                                style={{
                                  backgroundColor: "var(--sho-bg-color)",
                                }}
                              >
                                <Plus
                                  className="w-4 h-4"
                                  style={{ color: "var(--text-color)" }}
                                />
                              </button>
                            </div>
                            <div className="text-right">
                              <p
                                className="text-2xl font-bold"
                                style={{ color: "var(--text-color)" }}
                              >
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p
                                style={{
                                  color: "var(--text-color)",
                                  opacity: 0.7,
                                }}
                              >
                                ${item.price} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-8 flex items-center gap-4"
                    style={{ color: "var(--text-color)" }}
                  >
                    <Shield
                      className="w-6 h-6"
                      style={{ color: "var(--dark-gold-color)" }}
                    />
                    <span>Secure Payment</span>
                    <CreditCard className="w-6 h-6" />
                    <span>Multiple Payment Options</span>
                    <Truck className="w-6 h-6" />
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1 ">
              <div
                className="rounded-3xl shadow-xl p-8 sticky top-8"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <h2
                  className="text-2xl font-bold mb-8"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div
                    className="flex justify-between"
                    style={{ color: "var(--text-color)", opacity: 0.8 }}
                  >
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between"
                    style={{ color: "var(--text-color)", opacity: 0.8 }}
                  >
                    <span>Shipping</span>
                    <span
                      className="font-semibold"
                      style={{ color: "var(--dark-gold-color)" }}
                    >
                      Free
                    </span>
                  </div>
                  <div
                    className="flex justify-between"
                    style={{ color: "var(--text-color)", opacity: 0.8 }}
                  >
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <hr style={{ borderColor: "var(--card-color)" }} />
                  <div
                    className="flex justify-between text-2xl font-bold"
                    style={{ color: "var(--text-color)" }}
                  >
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="w-full py-4 rounded-2xl font-bold text-lg mb-4 shadow-lg"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--text-color)",
                  }}
                >
                  Proceed to Secure Checkout
                </button>

                <button
                  className="w-full py-3 rounded-2xl font-semibold"
                  style={{
                    border: "2px solid var(--card-color)",
                    color: "var(--text-color)",
                    backgroundColor: "var(--sho-bg-color)",
                  }}
                >
                  Continue Shopping
                </button>

                <div
                  className="mt-6 p-4 rounded-xl"
                  style={{ backgroundColor: "var(--sho-bg-color)" }}
                >
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "var(--text-color)", opacity: 0.7 }}
                  >
                    <Shield
                      className="w-4 h-4"
                      style={{ color: "var(--dark-gold-color)" }}
                    />
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
  );
};

export default Cart;
