import React, { useState } from 'react';
import { Minus, Plus, X, Shield, CreditCard, Truck } from 'lucide-react';

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
      quantity: 1,
      color: 'Black',
      rating: 4.8,
      brand: 'AudioTech',
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Premium Coffee Mug',
      price: 24.99,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      quantity: 2,
      color: 'White',
      rating: 4.5,
      brand: 'CoffeeCo',
      category: 'Kitchen'
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      price: 34.99,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      quantity: 1,
      color: 'Navy',
      size: 'M',
      rating: 4.7,
      brand: 'EcoWear',
      category: 'Clothing'
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id) => {
    setItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-slate-100 mt-5">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
                <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
                <p className="text-slate-300">Secure checkout with 256-bit SSL encryption</p>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl shadow-md" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 p-1">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-slate-600 mb-1">{item.brand}</p>
                        <p className="text-slate-600 mb-4">{item.color} {item.size && `• ${item.size}`}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-white border-2 border-slate-200 rounded-xl">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-3 hover:bg-slate-100 rounded-l-xl">
                              <Minus className="w-4 h-4 text-slate-600" />
                            </button>
                            <span className="px-4 py-3 font-semibold text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-3 hover:bg-slate-100 rounded-r-xl">
                              <Plus className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-slate-500">${item.price} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4 text-slate-600">
                  <Shield className="w-6 h-6 text-green-600" />
                  <span>Secure Payment</span>
                  <CreditCard className="w-6 h-6 text-slate-600 ml-4" />
                  <span>Multiple Payment Options</span>
                  <Truck className="w-6 h-6 text-slate-600 ml-4" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <hr className="border-slate-200" />
                <div className="flex justify-between text-2xl font-bold text-slate-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg mb-4">
                Proceed to Secure Checkout
              </button>

              <button className="w-full border-2 border-slate-300 text-slate-700 py-3 rounded-2xl font-semibold hover:bg-slate-50 transition-colors">
                Continue Shopping
              </button>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Your payment information is protected by 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
