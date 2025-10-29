// src/api.js

// Base API URL
export const BASE_URL = "https://admin.huesandharvest.com/api/";
// export const BASE_URL = "/admin/api/";

// Endpoints as functions for consistency
export const ENDPOINTS = {
  VALIDATE: () => `${BASE_URL}validate.php`,
  REFRESH: () => `${BASE_URL}refresh.php`,
  REGISTER: () => `${BASE_URL}register.php`,
  LOGIN: () => `${BASE_URL}login.php`,
  FORGET_PASSWORD: () => `${BASE_URL}forget-password.php`,
  RESET_PASSWORD: () => `${BASE_URL}reset-password.php`,
  LOGOUT: () => `${BASE_URL}logout.php`,
  LIST_PRODUCTS: () => `${BASE_URL}list_products.php`,
  LIST_COMBO: () => `${BASE_URL}listproducts_combo.php`,
  INSTAGRAM_FEED: () => `${BASE_URL}instagram.php`,
  REVIEWS: () => `${BASE_URL}reviews.php`,
  GET_PRODUCT: (id) => `${BASE_URL}get_product.php?id=${id}`,
  FEATURED_PRODUCTS: () => `${BASE_URL}featured_products.php`,
  PRODUCT_COUNT: (id) => `${BASE_URL}product_count.php`,
  PRODUCT_REVIEWS: (id) => `${BASE_URL}product_reviews.php?id=${id}`,
  CART_COUNT: (userId) => `${BASE_URL}cart_count.php?user_id=${userId}`, // ✅ new endpoint for cart count
  GET_POSTS: () => `${BASE_URL}get_posts.php`,
  CART: () => `${BASE_URL}cart.php`,
  ADD_TO_CART: () => `${BASE_URL}add-to-cart.php`,
  REMOVE_FROM_CART: () => `${BASE_URL}removecart.php`,
  PRODUCT_QUANTITY: () => `${BASE_URL}product_quantity.php`,
  PROFILE: () => `${BASE_URL}profile.php`,
  UPDATE_PROFILE: () => `${BASE_URL}update-profile.php`,
  REQUEST_PASSWORD_OTP: () => `${BASE_URL}request_password_otp.php`,
  VERIFY_PASSWORD_OTP: () => `${BASE_URL}verify_password_otp.php`,

  CREATE_RAZORPAY_ORDER: () => `${BASE_URL}create_order.php`,
  VERIFY_RAZORPAY_PAYMENT: () => `${BASE_URL}verify_payment.php`,
  PINCODE: () => `${BASE_URL}pincode.php`,

  GET_ORDERS: () => `${BASE_URL}orders.php`,

  ADDRESSES: () => `${BASE_URL}addresses.php`,
};
