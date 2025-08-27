import React, { useState } from 'react';
import { Heart, Trash2, ShoppingCart, Eye } from 'lucide-react';

const WishlistSection = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'TechAudio',
      inStock: true,
      rating: 4.5,
      dateAdded: '2024-01-10'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 299.99,
      originalPrice: 349.99,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'FitTech',
      inStock: true,
      rating: 4.8,
      dateAdded: '2024-01-08'
    },
    {
      id: 3,
      name: 'Premium Leather Backpack',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=300',
      brand: 'StyleCo',
      inStock: false,
      rating: 4.3,
      dateAdded: '2024-01-05'
    }
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    // Add to cart logic here
    console.log('Added to cart:', item);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
            <p className="text-gray-500 mt-2">{wishlistItems.length} items saved for later</p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Heart className="w-5 h-5 fill-current text-red-500" />
                </button>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">{item.brand}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">{item.name}</h3>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({item.rating})</span>
                </div>

                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                  {item.originalPrice > item.price && (
                    <>
                      <span className="text-lg text-gray-500 line-through ml-2">${item.originalPrice}</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                      item.inStock
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                  <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Added {new Date(item.dateAdded).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Start browsing and add items you love to your wishlist.</p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;
