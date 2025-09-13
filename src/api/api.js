// src/api.js

// Base API URL
export const BASE_URL = "https://admin.huesandharvest.com/api/";

// Endpoints as functions for consistency
export const ENDPOINTS = {
  LIST_PRODUCTS: () => `${BASE_URL}list_products.php`,
  INSTAGRAM_FEED: () => `${BASE_URL}instagram.php`,
  REVIEWS: () => `${BASE_URL}reviews.php`,
  GET_PRODUCT: (id) => `${BASE_URL}get_product.php?id=${id}`,
  PRODUCT_REVIEWS: (id) => `${BASE_URL}product_reviews.php?id=${id}`,
  CART_COUNT: (userId) => `${BASE_URL}cart_count.php?user_id=${userId}`, // ✅ new endpoint for cart count
};
