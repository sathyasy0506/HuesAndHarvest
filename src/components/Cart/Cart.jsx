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
    <div className="min-h-screen pt-12 bg-dashboard-bg text-primary-text">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-12 py-20">
            <h2 className="text-3xl font-bold mb-4 font-outfit">
              Your Cart is Empty
            </h2>
            <p className="mb-6 opacity-70">
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
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl overflow-hidden card-bg">
                <div className="p-8 gradient-header text-white">
                  <h1 className="text-3xl font-bold mb-2 font-outfit">
                    Shopping Cart
                  </h1>
                  <p className="opacity-70">
                    Secure checkout with 256-bit SSL encryption
                  </p>
                </div>

                <div className="p-8 cards-bg">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-6 p-6 rounded-2xl border border-card-color border-[0.5px] cards-bg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold font-outfit">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 hover:text-error-color"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="opacity-70">{item.brand}</p>
                          <p className="opacity-70">
                            {item.color} {item.size && `• ${item.size}`}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border-2 rounded-xl border-card-color">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-3 hover:bg-accent-hover rounded-l-xl"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-3 font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-3 hover:bg-accent-hover rounded-r-xl"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="opacity-70">${item.price} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <Shield className="w-6 h-6 text-dark-gold-color" />
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
            <div className="lg:col-span-1">
              <div className="rounded-3xl shadow-xl p-8 sticky top-8 card-bg">
                <h2 className="text-2xl font-bold mb-8 font-outfit">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between opacity-80">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between opacity-80">
                    <span>Shipping</span>
                    <span className="font-semibold text-dark-gold-color">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between opacity-80">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <hr className="border-card-color" />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl font-bold text-lg mb-4 shadow-lg primary-button">
                  Proceed to Secure Checkout
                </button>

                <button className="w-full py-3 rounded-2xl secondary-button mb-4">
                  Continue Shopping
                </button>

                <div className="mt-6 p-4 rounded-xl cards-bg">
                  <div className="flex items-center gap-2 text-sm opacity-70">
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
  );
};

export default Cart;
