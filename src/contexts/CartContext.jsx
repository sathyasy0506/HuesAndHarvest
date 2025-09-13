// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { ENDPOINTS } from "../api/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const token = localStorage.getItem("hh_token");

  const fetchCartCount = async () => {
    if (!user || !token) return;
    try {
      const res = await fetch(ENDPOINTS.CART_COUNT(user.id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) setCartCount(data.count);
    } catch (err) {
      console.error("Cart count fetch failed:", err);
    }
  };

  // Fetch on login
  useEffect(() => {
    fetchCartCount();
  }, [user]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
