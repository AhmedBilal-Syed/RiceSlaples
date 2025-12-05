// Updated Header.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  FaSearch, 
  FaPhone, 
  FaEnvelope, 
  FaUser, 
  FaCartPlus, 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaRegHeart,
  FaSignOutAlt,
  FaUserCircle,
  FaUserCheck,
  FaHome,
  FaShoppingBag,
  FaBook,
  FaHeart,
  FaShoppingCart
} from "react-icons/fa";
import SlideInCart from "./SlideInCart";
import AuthPopup from "./AuthPopup";

// Helper function to safely access localStorage
const getStoredAuthState = (): boolean => {
  if (typeof window === 'undefined') {
    return false; // Return default during SSR
  }
  try {
    const saved = localStorage.getItem('isLoggedIn');
    return saved ? JSON.parse(saved) : false;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return false;
  }
};

const Header = () => {
  const [isWholesale, setIsWholesale] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [collectionDropdown, setCollectionDropdown] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(2);
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  
  // Persistent login state using localStorage with SSR support
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const location = useLocation();

  // Initialize client-side state after component mounts
  useEffect(() => {
    setIsClient(true);
    const authState = getStoredAuthState();
    setIsLoggedIn(authState);
  }, []);

  // Save login state to localStorage whenever it changes (client-side only)
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
        console.log("Login state saved to localStorage:", isLoggedIn);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [isLoggedIn, isClient]);

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vegetable tomato fresh",
      size: "5kg",
      brand: "Petro demo",
      price: 384.51,
      quantity: 1,
      image: "🍅"
    },
    {
      id: 2,
      name: "Fresh healthy food",
      size: "5kg",
      brand: "Multiwebinfo",
      price: 230.00,
      quantity: 1,
      image: "🥗"
    }
  ]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const collectionItems = [
    {
      id: 1,
      title: "Best Seller",
      description: "Most popular products",
      image: "⭐",
      link: "/products?filter=best-seller"
    },
    {
      id: 2,
      title: "Special Products",
      description: "Limited time offers",
      image: "🎯",
      link: "/products?filter=special"
    },
    {
      id: 3,
      title: "Featured",
      description: "Curated selections",
      image: "✨",
      link: "/products?filter=featured"
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

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthPopupOpen(true);
    setOpen(false);
  };

  const handleLogin = () => {
    console.log("Setting user as logged in");
    setIsLoggedIn(true);
    setAuthPopupOpen(false);
  };

  const handleLogout = () => {
    console.log("Setting user as logged out");
    setIsLoggedIn(false);
    setOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest('.mobile-menu-container') && !target.closest('[aria-label="Toggle menu"]')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  // Don't render auth-dependent content during SSR to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="bg-white sticky top-0 z-50 border-b border-[#E5E5E5] shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-3 px-4 lg:py-4 lg:px-0">
            <Link to="/" className="text-xl lg:text-4xl font-bold text-black  flex-shrink-0">
              Rice And Staples
            </Link>
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Bar - Improved Mobile */}
     

      {/* Main Header - Improved Mobile Layout */}
      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 border-b border-[#E5E5E5] ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="container mx-auto">
          {/* Top Row - Better Mobile Spacing */}
  <div className="flex items-center justify-between py-3 px-4 lg:py-4 lg:px-0">
  {/* Logo */}
  <Link to="/" className="text-xl lg:text-4xl font-bold text-[#222222] flex-shrink-0 transition-all duration-300 hover:scale-105">
              Rice And Staples
  </Link>

  {/* Search Bar - Hidden on Mobile */}
  <div className="hidden lg:flex flex-1 max-w-xl mx-6">
    <div className="relative w-full transition-all duration-300 hover:scale-105">
      <input
        type="text"
        placeholder="Search our store"
        className="w-full rounded-full border border-[#E5E5E5] px-6 py-3 focus:ring-2 focus:ring-[#6B8E23] focus:outline-none text-[#333333] bg-[#f8f8f8] shadow-sm transition-all duration-300 hover:shadow-md"
      />
      <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#696969] transition-all duration-300" />
    </div>
  </div>

  {/* Right Section - Enhanced Container */}
  <div className="flex items-center space-x-3 lg:space-x-4 border border-[#E5E5E5] p-3 rounded-full bg-[#f8f8f8] shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#c23d00] hover:bg-white">
    {/* Toggle */}
    <div className="hidden md:flex items-center">
      <div className="flex bg-[#f0f0f0] rounded-full p-1 shadow-inner">
        <button
          onClick={() => setIsWholesale(false)}
          className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
            !isWholesale 
              ? "bg-[#b91d08] shadow-md text-white hover:bg-[#c23d00]" 
              : "text-[#696969] hover:text-[#333333] hover:bg-white"
          }`}
        >
          Retail
        </button>
        <button
          onClick={() => setIsWholesale(true)}
          className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
            isWholesale 
              ? "bg-[#b91d08] shadow-md text-white hover:bg-[#c23d00]" 
              : "text-[#696969] hover:text-[#333333] hover:bg-white"
          }`}
        >
          Wholesale
        </button>
      </div>
    </div>

    {/* Mobile Menu Toggle */}
    <button 
      onClick={() => setOpen(!open)}
      className="lg:hidden text-[#333333] p-2 rounded-full hover:bg-[#6B8E23] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm"
      aria-label="Toggle menu"
    >
      {open ? <FaTimes size={20} /> : <FaBars size={20} />}
    </button>
  </div>

  {/* Contact Info - Enhanced */}
  <div className="hidden lg:flex items-center space-x-4">
    <span className="flex items-center space-x-2 border border-[#E5E5E5] px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#6B8E23] hover:bg-[#f8f8f8]">
      <FaPhone className="text-[#c23d00] text-sm" />
      <span className="text-[#333333] text-sm font-medium whitespace-nowrap">+2600 0500 2600</span>
    </span>
    <span className="flex items-center space-x-2 border border-[#E5E5E5] px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#6B8E23] hover:bg-[#f8f8f8]">
      <FaEnvelope className="text-[#c23d00] text-sm" />
      <span className="text-[#333333] text-sm font-medium whitespace-nowrap">Info@gmail.com</span>
    </span>
  </div>
</div>

{/* Desktop Navigation - Enhanced */}
<nav className="hidden lg:block border-t border-[#E5E5E5] mt-0">
  <div className="flex justify-between items-center py-4">
    {/* Left Side - Navigation Menu */}
    <div className="flex items-center space-x-8">
      {/* Navigation Menu Items */}
      <div className="flex items-center space-x-8">
        {[
          { path: "/", label: "HOME" },
          { path: "/products", label: "SHOP" },
          { 
            path: "#", 
            label: "COLLECTION",
            hasDropdown: true 
          },
          { path: "/blog", label: "BLOG" },
        ].map(item => (
          item.hasDropdown ? (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => setCollectionDropdown(true)}
              onMouseLeave={() => setCollectionDropdown(false)}
            >
              <button className="flex items-center text-[#333333] font-bold hover:text-[#6B8E23] transition-all duration-300 text-sm uppercase group transform hover:scale-105">
                {item.label}
                <FaChevronDown className={`ml-2 w-3 h-3 transition-all duration-300 ${collectionDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu - Enhanced */}
              {collectionDropdown && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-80 bg-white border border-[#E5E5E5] rounded-xl shadow-2xl z-50 transition-all duration-300">
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-3">
                      {collectionItems.map((collection) => (
                        <Link
                          key={collection.id}
                          to={collection.link}
                          className="flex items-center space-x-4 p-4 rounded-lg hover:bg-[#F5F5DC] transition-all duration-300 group transform hover:scale-105 border border-transparent hover:border-[#6B8E23]"
                          onClick={() => setCollectionDropdown(false)}
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center group-hover:border-[#6B8E23] transition-all duration-300 shadow-sm">
                            <span className="text-2xl transition-all duration-300">{collection.image}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#333333] text-sm group-hover:text-[#6B8E23] transition-all duration-300">
                              {collection.title}
                            </h3>
                            <p className="text-[#696969] text-xs mt-1 transition-all duration-300">
                              {collection.description}
                            </p>
                          </div>
                          <svg
                            className="w-4 h-4 text-[#696969] group-hover:text-[#6B8E23] transition-all duration-300 flex-shrink-0 transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[#333333] font-bold hover:text-[#6B8E23] transition-all duration-300 text-sm uppercase transform hover:scale-105 ${
                  isActive ? "text-[#6B8E23] border-b-2 border-[#6B8E23] pb-1" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          )
        ))}
      </div>

      {/* Request Products Button - Enhanced */}
      <button 
        onClick={() => navigate("/request-product")}
        className="flex items-center bg-[#b91d08] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#b91d08] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        Request Products
      </button>
    </div>

    {/* Right Side - Auth and Icons */}
    <div className="flex items-center gap-6">
      {/* Auth Section - Enhanced */}
      <div className="hidden md:flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Link 
              to="/account" 
              className="flex items-center space-x-2 text-[#333333] hover:text-[#6B8E23] transition-all duration-300 group transform hover:scale-105"
            >
              <div className="relative transition-all duration-300 group-hover:scale-110">
                <FaUserCheck className="w-6 h-6 text-[#6B8E23] group-hover:text-[#5A7A1A] transition-all duration-300" />
              </div>
              <span className="text-sm font-medium">My Account</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-[#333333] hover:text-[#DC143C] transition-all duration-300 p-2 rounded-full hover:bg-gray-100 transform hover:scale-110 shadow-sm"
              title="Logout"
            >
              <FaSignOutAlt size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3 bg-[#f8f8f8] rounded-full px-4 py-2 shadow-sm">
            <button
              onClick={() => handleAuthClick("login")}
              className="flex items-center space-x-2 text-[#333333] hover:text-[#6B8E23] transition-all duration-300 font-medium text-sm px-3 py-1 rounded-full hover:bg-white transform hover:scale-105"
            >
              <FaUserCircle className="w-4 h-4 transition-all duration-300" />
              <span>Login</span>
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => handleAuthClick("signup")}
              className="text-[#333333] hover:text-[#6B8E23] transition-all duration-300 font-medium text-sm px-3 py-1 rounded-full hover:bg-white transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Icons Section - Enhanced */}
      <div className="flex gap-5 items-center">
        <Link 
          to="/wishlist" 
          className="relative text-[#333333] hover:text-[#6B8E23] transition-all duration-300 transform hover:scale-110"
        >
          <FaRegHeart size={24} className="lg:w-6 lg:h-6 transition-all duration-300" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#DC143C] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold transition-all duration-300 shadow-md">
              {wishlistCount}
            </span>
          )}
        </Link>

        <button 
          onClick={() => setCartOpen(!cartOpen)}
          className="relative text-[#333333] hover:text-[#6B8E23] transition-all duration-300 transform hover:scale-110"
          data-cart-icon="true"
        >
          <FaCartPlus size={24} className="lg:w-6 lg:h-6 transition-all duration-300" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#DC143C] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold transition-all duration-300 shadow-md">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </div>
</nav>

          {/* Mobile Menu - Improved Responsive Styling Without Blackout */}
          <div className={`lg:hidden mobile-menu-container fixed inset-y-0 right-0 z-40 bg-white transition-all duration-300 ease-in-out transform ${
            open ? "translate-x-0" : "translate-x-full"
          } w-80 max-w-[85vw] shadow-2xl border-l border-gray-200`}>
            
            {/* Sidebar Content */}
            <div className="h-full overflow-y-auto">
              <div className="p-4 space-y-4">
                {/* Close Button - Mobile */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-bold text-gray-800">Menu</h3>
                  <button 
                    onClick={() => setOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {/* Toggle - Better Mobile Layout with Updated Colors */}
                <div className="flex bg-[#f0f0f0] rounded-2xl p-1">
                  <button
                    onClick={() => setIsWholesale(false)}
                    className={`flex-1 py-3 rounded-xl transition text-sm font-medium ${
                      !isWholesale 
                        ? "bg-[#b91d08] shadow text-white hover:bg-[#c23d00]" 
                        : "text-[#696969] hover:text-[#333333] hover:bg-white"
                    }`}
                  >
                    Retail
                  </button>
                  <button
                    onClick={() => setIsWholesale(true)}
                    className={`flex-1 py-3 rounded-xl transition text-sm font-medium ${
                      isWholesale 
                        ? "bg-[#b91d08] shadow text-white hover:bg-[#c23d00]" 
                        : "text-[#696969] hover:text-[#333333] hover:bg-white"
                    }`}
                  >
                    Wholesale
                  </button>
                </div>

                {/* Auth Section - Mobile */}
                {isLoggedIn ? (
                  // Logged in state - Mobile with better icons
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#6B8E23] rounded-full flex items-center justify-center text-white">
                          <FaUserCheck size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">My Account</h3>
                          <p className="text-gray-600 text-sm">Welcome back!</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-[#DC143C] transition-colors p-2 rounded-lg hover:bg-white"
                        title="Logout"
                      >
                        <FaSignOutAlt size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Not logged in - Mobile with updated colors
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAuthClick("login")}
                      className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-[#f8f8f8] text-[#333333] font-bold hover:bg-[#6B8E23] hover:text-white transition-colors border border-[#E5E5E5]"
                    >
                      <FaUserCircle size={16} />
                      <span className="text-sm">LOGIN</span>
                    </button>
                    <button
                      onClick={() => handleAuthClick("signup")}
                      className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-[#c23d00] text-white font-bold hover:bg-[#DC143C] transition-colors"
                    >
                      <span className="text-sm">SIGN UP</span>
                    </button>
                  </div>
                )}

                {/* Navigation Links - Better Mobile Spacing with Icons and Updated Colors */}
                <div className="space-y-2">
                  {[
                    { path: "/", label: "HOME", icon: <FaHome size={18} /> },
                    { path: "/products", label: "SHOP", icon: <FaShoppingBag size={18} /> },
                    { path: "/blog", label: "BLOG", icon: <FaBook size={18} /> },
                    { path: "/wishlist", label: "WISHLIST", icon: <FaHeart size={18} /> },
                    { path: "/cart", label: "CART", icon: <FaShoppingCart size={18} /> },
                    ...(isLoggedIn ? [{ path: "/account", label: "MY ACCOUNT", icon: <FaUserCheck size={18} /> }] : [])
                  ].map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="flex items-center space-x-4 py-4 px-4 rounded-2xl bg-[#f8f8f8] text-[#333333] font-bold hover:bg-[#6B8E23] hover:text-white transition-colors text-sm group border border-[#E5E5E5]"
                    >
                      <div className="text-[#c23d00] group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Request Button - Better Mobile Styling */}
                <button 
                  onClick={() => {
                    navigate("/request-product");
                    setOpen(false);
                  }}
                  className="w-full bg-[#b91d08] text-white py-4 rounded-2xl font-bold bg-[#b91d08] transition-colors text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <span>🚀</span>
                  <span>REQUEST PRODUCTS</span>
                </button>

                {/* Contact Info in Mobile Menu */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-[#c23d00] flex-shrink-0" size={14} />
                      <span>+2600 0500 2600</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-[#c23d00] flex-shrink-0" size={14} />
                      <span>Info@gmail.com</span>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex space-x-4 mt-4 pt-4 border-t border-gray-200">
                    <button className="text-gray-500 hover:text-[#6B8E23] transition-colors text-sm">
                      Facebook
                    </button>
                    <button className="text-gray-500 hover:text-[#6B8E23] transition-colors text-sm">
                      Instagram
                    </button>
                    <button className="text-gray-500 hover:text-[#6B8E23] transition-colors text-sm">
                      Twitter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-in Cart */}
      <SlideInCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={undefined}
      />

      {/* Auth Popup */}
      <AuthPopup
        isOpen={authPopupOpen}
        onClose={() => setAuthPopupOpen(false)}
        initialMode={authMode}
        onAuthSuccess={handleLogin}
      />
    </>
  );
};

export default Header;