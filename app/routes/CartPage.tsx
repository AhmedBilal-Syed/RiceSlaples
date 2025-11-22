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
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100 pb-6 mb-6 last:border-b-0 last:mb-0">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-green-50 rounded-lg flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">Size: {item.size} • Brand: {item.brand}</p>
                      <p className="text-green-600 font-semibold mt-2">${item.price.toFixed(2)} CAD</p>
                      
                      {/* Delivery Options */}
                      <div className="mt-4 space-y-3">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => updateDeliveryOption(item.id, 'home')}
                            className={`px-3 py-1 text-sm rounded-lg border ${
                              item.deliveryOption === 'home' 
                                ? 'bg-green-600 text-white border-green-600' 
                                : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                            }`}
                          >
                            🚚 Home Delivery
                          </button>
                          <button
                            onClick={() => updateDeliveryOption(item.id, 'store')}
                            className={`px-3 py-1 text-sm rounded-lg border ${
                              item.deliveryOption === 'store' 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                            }`}
                          >
                            🏪 Store Pickup
                          </button>
                        </div>

                        {/* Store Selector for Pickup Items */}
                        {item.deliveryOption === 'store' && (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Select Pickup Store:
                            </label>
                            <select
                              value={item.selectedStore?.id || ''}
                              onChange={(e) => {
                                const store = storeLocations.find(s => s.id === e.target.value);
                                if (store) updateSelectedStore(item.id, store);
                              }}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                              <option value="">Choose a store...</option>
                              {storeLocations.map(store => (
                                <option key={store.id} value={store.id}>
                                  {store.name} ({store.distance})
                                </option>
                              ))}
                            </select>
                            {item.selectedStore && (
                              <p className="text-xs text-blue-700 mt-2">
                                📍 {item.selectedStore.address}, {item.selectedStore.city}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="ml-6 text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
                <Link
                  to="/products"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center font-medium"
                >
                  Continue shopping
                </Link>
                <button 
                  onClick={() => setCartItems([...cartItems])}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
                >
                  Update cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <span>{item.quantity} × {item.name}</span>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.deliveryOption === 'home' ? '🚚 Home Delivery' : '🏪 Store Pickup'}
                      </div>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)} CAD</span>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)} CAD</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)} CAD</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (13%)</span>
                    <span>${tax.toFixed(2)} CAD</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)} CAD</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={!isCheckoutReady}
                  className={`w-full py-3 rounded-lg font-medium mt-4 ${
                    isCheckoutReady
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={clearCart}
                  className="w-full border border-red-300 text-red-600 py-3 rounded-lg hover:bg-red-50 font-medium"
                >
                  Clear cart
                </button>
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