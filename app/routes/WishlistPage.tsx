// WishlistPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "~/Components/Footer";
import Header from "~/Components/Header";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Vegetable tomato fresh",
      size: "5kg",
      brand: "Petro demo",
      currentPrice: 384.51,
      originalPrice: 405.00,
      image: "🍅",
      inStock: true
    },
    {
      id: 2,
      name: "Fresh healthy food",
      size: "6kg",
      brand: "Multiwebinfo",
      currentPrice: 460.00,
      originalPrice: 400.00,
      image: "🥗",
      inStock: true
    },
    {
      id: 3,
      name: "Fresh green orange",
      size: "3kg",
      brand: "Vegist store",
      currentPrice: 109.20,
      originalPrice: 99.99,
      image: "🍊",
      inStock: true
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const addToCart = (item: { id: number; name: string; size: string; brand: string; currentPrice: number; originalPrice: number; image: string; inStock: boolean; }) => {
    console.log("Added to cart:", item);
  };

  const buyNow = (item: { id: number; name: string; size: string; brand: string; currentPrice: number; originalPrice: number; image: string; inStock: boolean; }) => {
    console.log("Buy now:", item);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Main Content with Enhanced Spacing */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Centered Page Title with Enhanced Styling */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">My Wishlist</h1>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </div>

          {/* Wishlist Items Container */}
          <div className="max-w-6xl mx-auto">
            {wishlistItems.length === 0 ? (
              // Empty State with Enhanced Design
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-8xl mb-6">💔</div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                  Looks like you haven't added any items to your wishlist yet. Start exploring our products!
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-medium text-lg"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Wishlist Items Grid with Enhanced Cards */}
                <div className="space-y-8">
                  {wishlistItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        {/* Product Info Section */}
                        <div className="flex-1">
                          <div className="flex gap-6 items-start">
                            {/* Enhanced Product Image */}
                            <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                              {item.image}
                            </div>
                            
                            {/* Enhanced Product Details */}
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 text-xl mb-2">{item.name}</h3>
                              <div className="space-y-1 mb-4">
                                <p className="text-gray-600 text-sm">
                                  <span className="font-medium">Size:</span> {item.size}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  <span className="font-medium">Brand:</span> {item.brand}
                                </p>
                              </div>
                              
                              {/* Enhanced Action Buttons */}
                              <div className="flex flex-wrap gap-4 mt-6">
                                <button
                                  onClick={() => addToCart(item)}
                                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                                >
                                  Add to cart
                                </button>
                                <button
                                  onClick={() => buyNow(item)}
                                  className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                                >
                                  Buy now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Price Section */}
                        <div className="flex flex-col items-end gap-4">
                          {/* Price Container */}
                          <div className="text-right space-y-2">
                            {/* Current Price */}
                            <div>
                              <span className="text-3xl font-bold text-gray-800">
                                ${item.currentPrice.toFixed(2)} USD
                              </span>
                            </div>

                            {/* Original Price with Enhanced Styling */}
                            {item.originalPrice && item.originalPrice > item.currentPrice && (
                              <div>
                                <span className="text-xl text-red-500 line-through font-medium">
                                  ${item.originalPrice.toFixed(2)} USD
                                </span>
                                {/* Discount Badge */}
                                <div className="inline-block bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded ml-2">
                                  SAVE ${(item.originalPrice - item.currentPrice).toFixed(2)}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Enhanced Remove Button */}
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                            title="Remove from wishlist"
                          >
                            <svg 
                              className="w-6 h-6" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Bottom Actions */}
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mt-16 pt-8 border-t border-gray-200">
                  <Link
                    to="/products"
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 text-center font-medium transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    ← Continue Shopping
                  </Link>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="text-gray-600 text-sm">
                      {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in wishlist
                    </div>
                    <button
                      onClick={clearWishlist}
                      className="px-8 py-4 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-400 font-medium transition-all duration-300 transform hover:scale-105 text-lg"
                    >
                      Clear Wishlist
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;