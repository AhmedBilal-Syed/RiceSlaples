// SlideInCart.jsx
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SlideInCart = ({ isOpen, onClose, cartItems, updateQuantity, removeItem, clearCart }) => {
  const cartRef = useRef(null);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 15.00; // Fixed shipping for simplicity
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        const cartIcon = document.querySelector('[data-cart-icon]');
        if (cartIcon && !cartIcon.contains(event.target)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    onClose();
    navigate('/cart'); // Navigate to full cart page for checkout
  };

  const handleQuickCheckout = () => {
    onClose();
    navigate('/cart', { state: { quickCheckout: true } });
  };

  return (
    <div 
      ref={cartRef}
      className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🛒 Shopping Cart 
          <span className="text-sm font-normal text-gray-500">({cartItems.length})</span>
        </h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 px-4">
            <div className="text-6xl mb-4 text-gray-300">🛒</div>
            <p className="text-gray-600 mb-2">Your cart is empty</p>
            <p className="text-gray-500 text-sm">Add some products to get started</p>
            <button
              onClick={onClose}
              className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    {item.image}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-2 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-xs mt-1">Size: {item.size}</p>
                    {item.brand && (
                      <p className="text-gray-600 text-xs">Brand: {item.brand}</p>
                    )}
                    <p className="text-green-600 font-semibold text-sm mt-1">
                      ${item.price.toFixed(2)} CAD
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="w-6 h-6 flex items-center justify-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs transition-colors duration-200 p-1"
                        title="Remove Item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="border-t border-gray-200 bg-white p-4 space-y-4 sticky bottom-0">
          {/* Order Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)} CAD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">${shipping.toFixed(2)} CAD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (13%):</span>
              <span className="font-medium">${tax.toFixed(2)} CAD</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total:</span>
              <span className="text-green-600">${total.toFixed(2)} CAD</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleQuickCheckout}
              className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-center font-medium transition-colors duration-200 shadow-sm"
            >
              Quick Checkout
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="block bg-white border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50 text-center font-medium transition-colors duration-200 text-sm"
              >
                View Full Cart
              </Link>
              
              <button 
                onClick={clearCart}
                className="bg-white border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 font-medium transition-colors duration-200 text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure checkout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideInCart;