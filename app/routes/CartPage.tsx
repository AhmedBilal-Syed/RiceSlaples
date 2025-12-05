// CartPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "~/Components/Footer";
import Header from "~/Components/Header";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vegetable tomato fresh",
      size: "5kg",
      brand: "Petro demo",
      price: 384.51,
      quantity: 1,
      image: "🍅",
      deliveryOption: "home",
      selectedStore: null
    },
    {
      id: 2,
      name: "Fresh healthy food",
      size: "5kg",
      brand: "Multiwebinfo",
      price: 230.00,
      quantity: 1,
      image: "🥗",
      deliveryOption: "home",
      selectedStore: null
    },
    {
      id: 3,
      name: "Fresh green orange",
      size: "5kg",
      brand: "Vegist store",
      price: 109.20,
      quantity: 1,
      image: "🍊",
      deliveryOption: "store",
      selectedStore: {
        id: "store-1",
        name: "Vegist Main Store",
        address: "123 Main Street, Andheri West",
        city: "Mumbai"
      }
    }
  ]);

  const navigate = useNavigate();

  // Store locations
  const storeLocations = [
    {
      id: "store-1",
      name: "Vegist Main Store",
      address: "123 Main Street, Andheri West",
      city: "Mumbai",
      distance: "2.5 km"
    },
    {
      id: "store-2",
      name: "Vegist Downtown",
      address: "456 Downtown Avenue, Connaught Place",
      city: "Delhi",
      distance: "1.8 km"
    }
  ];

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const updateDeliveryOption = (id: number, option: 'home' | 'store') => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { 
          ...item, 
          deliveryOption: option,
          selectedStore: option === 'store' ? storeLocations[0] : null
        } : item
      )
    );
  };

  const updateSelectedStore = (id: number, store: any) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selectedStore: store } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    // Navigate to unified checkout with cart items
    navigate('/checkout', { 
      state: { 
        items: cartItems,
        source: 'cart'
      } 
    });
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = cartItems.some(item => item.deliveryOption === 'home') ? 15.00 : 0;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  // Check if all items have valid delivery options
  const isCheckoutReady = cartItems.every(item => 
    item.deliveryOption && (item.deliveryOption === 'home' || item.selectedStore)
  );

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4 text-[#b91d08]">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/products"
              className="bg-[#b91d08] hover:bg-[#9e1807] text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Cart Page Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Cart</h1>
        <p className="text-gray-600 mb-8">You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100 pb-6 mb-6 last:border-b-0 last:mb-0">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center text-2xl shadow-inner">
                      {item.image}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1 mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                          Size: {item.size}
                        </span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                          Brand: {item.brand}
                        </span>
                      </div>
                      <p className="text-[#b91d08] font-bold text-lg mt-2">${item.price.toFixed(2)} CAD</p>
                      
                      {/* Delivery Options */}
                      <div className="mt-4 space-y-3">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => updateDeliveryOption(item.id, 'home')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                              item.deliveryOption === 'home' 
                                ? 'bg-[#b91d08] text-white border-[#b91d08] shadow-sm' 
                                : 'bg-white text-gray-800 border-gray-300 hover:border-[#b91d08] hover:text-[#b91d08]'
                            }`}
                          >
                            🚚 Home Delivery
                          </button>
                          <button
                            onClick={() => updateDeliveryOption(item.id, 'store')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                              item.deliveryOption === 'store' 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                : 'bg-white text-gray-800 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                            }`}
                          >
                            🏪 Store Pickup
                          </button>
                        </div>

                        {/* Store Selector for Pickup Items */}
                        {item.deliveryOption === 'store' && (
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              Select Pickup Store:
                            </label>
                            <select
                              value={item.selectedStore?.id || ''}
                              onChange={(e) => {
                                const store = storeLocations.find(s => s.id === e.target.value);
                                if (store) updateSelectedStore(item.id, store);
                              }}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="" className="text-gray-500">Choose a store...</option>
                              {storeLocations.map(store => (
                                <option key={store.id} value={store.id} className="text-gray-900">
                                  {store.name} ({store.distance})
                                </option>
                              ))}
                            </select>
                            {item.selectedStore && (
                              <p className="text-xs font-medium text-blue-800 mt-2 flex items-center gap-1">
                                <span className="text-blue-600">📍</span> {item.selectedStore.address}, {item.selectedStore.city}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold"
                            >
                              −
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center bg-white text-gray-900 font-medium border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold"
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-4 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Total:</span> ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[#b91d08] hover:text-[#9e1807] font-medium flex items-center gap-1 group"
                        >
                          <svg 
                            className="w-5 h-5 group-hover:scale-110 transition-transform" 
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
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8 pt-6 border-t border-gray-100">
                <Link
                  to="/products"
                  className="px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 text-center font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue shopping
                </Link>
                <button 
                  onClick={() => setCartItems([...cartItems])}
                  className="px-6 py-3 bg-[#b91d08] text-white rounded-lg hover:bg-[#9e1807] font-medium transition-colors shadow-sm hover:shadow"
                >
                  Update cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{item.quantity} × {item.name}</span>
                      <div className="text-xs mt-1">
                        <span className={`px-2 py-1 rounded ${item.deliveryOption === 'home' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                          {item.deliveryOption === 'home' ? '🚚 Home Delivery' : '🏪 Store Pickup'}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900 ml-2">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
                
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">${shipping.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (13%)</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)} CAD</span>
                </div>
              </div>
                
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-[#b91d08]">${total.toFixed(2)} CAD</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Prices are in Canadian Dollars (CAD)</p>
              </div>
                
              <button 
                onClick={handleCheckout}
                disabled={!isCheckoutReady}
                className={`w-full py-4 rounded-lg font-bold mt-6 mb-4 transition-all ${
                  isCheckoutReady
                    ? 'bg-[#b91d08] text-white hover:bg-[#9e1807] shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isCheckoutReady ? 'Proceed to Checkout →' : 'Select Delivery Options'}
              </button>
                
              {!isCheckoutReady && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Please select delivery options for all items
                  </p>
                </div>
              )}
              
              <button 
                onClick={clearCart}
                className="w-full border-2 border-red-200 text-[#b91d08] py-3 rounded-lg hover:bg-red-50 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear cart
              </button>

              {/* Payment Methods */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-900 mb-2">We accept:</p>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">Visa</div>
                  <div className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">MasterCard</div>
                  <div className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CartPage;