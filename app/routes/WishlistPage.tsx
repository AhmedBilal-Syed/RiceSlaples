// WishlistPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "~/Components/Footer";
import Header from "~/Components/Header";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Organic Fresh Tomatoes",
      size: "5kg",
      brand: "Farm Fresh",
      currentPrice: 384.51,
      originalPrice: 405.00,
      image: "🍅",
      inStock: true,
      category: "Vegetables"
    },
    {
      id: 2,
      name: "Organic Salad Mix",
      size: "6kg",
      brand: "Green Valley",
      currentPrice: 460.00,
      originalPrice: 400.00,
      image: "🥗",
      inStock: true,
      category: "Greens"
    },
    {
      id: 3,
      name: "Organic Green Oranges",
      size: "3kg",
      brand: "Citrus Grove",
      currentPrice: 109.20,
      originalPrice: 99.99,
      image: "🍊",
      inStock: true,
      category: "Fruits"
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const addToCart = (item: { id: number; name: string; size: string; brand: string; currentPrice: number; originalPrice: number; image: string; inStock: boolean; category: string; }) => {
    console.log("Added to cart:", item);
  };

  const buyNow = (item: { id: number; name: string; size: string; brand: string; currentPrice: number; originalPrice: number; image: string; inStock: boolean; category: string; }) => {
    console.log("Buy now:", item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />
      
      {/* Main Content with Enhanced Spacing */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Centered Page Title with Enhanced Styling */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-[#b91d08] to-[#9e1807] text-white px-6 py-2 rounded-full text-sm font-bold mb-4 tracking-wider">
              MY WISHLIST
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Saved Items</h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Save your favorite products and get notified when prices drop
            </p>
          </div>

          {/* Wishlist Items Container */}
          <div className="max-w-6xl mx-auto">
            {wishlistItems.length === 0 ? (
              // Empty State with Enhanced Design
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="text-8xl mb-6 text-[#b91d08]">💔</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                  Start adding your favorite products to your wishlist for easy access later!
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-[#b91d08] hover:bg-[#9e1807] text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-md"
                >
                  Browse Products →
                </Link>
              </div>
            ) : (
              <>
                {/* Wishlist Stats */}
                <div className="mb-8 bg-gradient-to-r from-[#b91d08]/10 to-[#9e1807]/10 p-6 rounded-2xl border border-[#b91d08]/20">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className="w-12 h-12 rounded-full bg-[#b91d08] flex items-center justify-center text-white shadow-md">
                        <span className="text-xl font-bold">{wishlistItems.length}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Items Saved</h3>
                        <p className="text-gray-700 text-sm">Total estimated value: <span className="font-bold text-[#b91d08]">
                          ${wishlistItems.reduce((sum, item) => sum + item.currentPrice, 0).toFixed(2)}
                        </span></p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Link
                        to="/products"
                        className="px-6 py-3 border-2 border-[#b91d08] text-[#b91d08] rounded-full hover:bg-[#b91d08] hover:text-white transition-all duration-300 font-bold"
                      >
                        Continue Shopping
                      </Link>
                      <button
                        onClick={clearWishlist}
                        className="px-6 py-3 bg-[#b91d08] hover:bg-[#9e1807] text-white rounded-full hover:shadow-lg transition-all duration-300 font-bold"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Wishlist Items Grid with Enhanced Cards */}
                <div className="space-y-6">
                  {wishlistItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-[#b91d08]/30"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Product Info Section */}
                        <div className="flex-1">
                          <div className="flex gap-6 items-start">
                            {/* Enhanced Product Image */}
                            <div className="relative">
                              <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                                {item.image}
                              </div>
                              {/* Category Badge */}
                              <div className="absolute -top-2 -right-2 bg-[#b91d08] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                {item.category}
                              </div>
                            </div>
                            
                            {/* Enhanced Product Details */}
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div>
                                  <h3 className="font-bold text-gray-900 text-xl mb-2">{item.name}</h3>
                                  <div className="space-y-1 mb-4">
                                    <p className="text-gray-700">
                                      <span className="font-semibold text-gray-900">Size:</span> {item.size}
                                    </p>
                                    <p className="text-gray-700">
                                      <span className="font-semibold text-gray-900">Brand:</span> 
                                      <span className="ml-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {item.brand}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                
                                {/* Stock Status */}
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${item.inStock ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                  <span className={`text-sm font-bold ${item.inStock ? 'text-green-600' : 'text-gray-500'}`}>
                                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Enhanced Action Buttons */}
                              <div className="flex flex-wrap gap-4 mt-6">
                                <button
                                  onClick={() => addToCart(item)}
                                  className="bg-[#b91d08] hover:bg-[#9e1807] text-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-md"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Add to cart
                                </button>
                                <button
                                  onClick={() => buyNow(item)}
                                  className="border-2 border-[#b91d08] text-[#b91d08] px-6 py-3 rounded-full font-bold hover:bg-[#b91d08] hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
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
                              <span className="text-3xl font-bold text-gray-900">
                                ${item.currentPrice.toFixed(2)}
                              </span>
                              <span className="text-gray-600 ml-2">CAD</span>
                            </div>

                            {/* Original Price with Enhanced Styling */}
                            {item.originalPrice && item.originalPrice > item.currentPrice && (
                              <div className="flex flex-col items-end">
                                <span className="text-lg text-red-600 line-through font-medium">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                                {/* Discount Badge */}
                                <div className="bg-gradient-to-r from-red-100 to-red-50 text-red-700 text-sm font-bold px-3 py-1 rounded-full mt-1 border border-red-200">
                                  Save ${(item.originalPrice - item.currentPrice).toFixed(2)}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Enhanced Remove Button */}
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="group relative p-3 hover:bg-red-50 rounded-full transition-all duration-300"
                            title="Remove from wishlist"
                          >
                            <div className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            <svg 
                              className="w-6 h-6 text-[#b91d08] group-hover:text-red-700 group-hover:scale-110 transition-all duration-300" 
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
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#b91d08]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Your wishlist is private and secure</p>
                      <p className="text-xs text-gray-500">We never share your saved items</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Link
                      to="/products"
                      className="px-8 py-4 border-2 border-[#b91d08] text-[#b91d08] rounded-full hover:bg-[#b91d08] hover:text-white transition-all duration-300 font-bold text-lg flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Continue Shopping
                    </Link>
                    <button
                      onClick={clearWishlist}
                      className="px-8 py-4 bg-[#b91d08] hover:bg-[#9e1807] text-white rounded-full hover:shadow-lg transition-all duration-300 font-bold text-lg flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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