// SlideInCart.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SlideInCart = ({ isOpen, onClose, cartItems, updateQuantity, removeItem }) => {
  const cartRef = useRef(null);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: { target: Node | null; }) => {
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
    const handleEscape = (event: { key: string; }) => {
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

  return (
    <div 
      ref={cartRef}
      className={`
        fixed top-0 right-0 h-full w-72 max-w-md bg-white shadow-2xl z-50 
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Shopping Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <i className="fas fa-times text-gray-600"></i>
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🛒</div>
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                    {item.image}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-gray-600 text-xs">Size: {item.size}</p>
                    <p className="text-green-600 font-semibold text-sm">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-gray-600 hover:bg-gray-200 transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="w-6 h-6 flex items-center justify-center text-xs">
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
                        className="text-red-500 hover:text-red-700 text-xs transition-colors duration-200"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)} CAD</span>
          </div>
          
          <div className="space-y-2">
            <Link
              to="/cart"
              onClick={onClose}
              className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-center font-medium transition-colors duration-200"
            >
              View Cart
            </Link>
            
            <button className="w-full border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 font-medium transition-colors duration-200">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideInCart;