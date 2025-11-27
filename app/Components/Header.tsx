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
            <Link to="/" className="text-xl lg:text-4xl font-bold text-[#6B8E23] flex-shrink-0">
              Rice And Staples
            </Link>
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Skeleton loading for auth state */}
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
      <div className="bg-[#6B8E23] text-white py-2 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col xs:flex-row justify-between items-center gap-2 xs:gap-4">
            {/* Contact Info - Better Mobile Stacking */}
            <div className="flex flex-wrap justify-center xs:justify-start gap-3 xs:gap-6 text-xs">
              <span className="flex items-center space-x-2">
                <FaPhone className="text-xs flex-shrink-0" />
                <span className="whitespace-nowrap">+2600 0500 2600</span>
              </span>
              <span className="flex items-center space-x-2">
                <FaEnvelope className="text-xs flex-shrink-0" />
                <span className="whitespace-nowrap">Info@gmail.com</span>
              </span>
            </div>
            
            {/* Sale Banner - Better Mobile Text */}
            <p className="font-medium text-xs xs:text-sm text-center xs:text-right whitespace-nowrap">
              Summer sale 50% off
            </p>
          </div>
        </div>
      </div>

      {/* Main Header - Improved Mobile Layout */}
      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 border-b border-[#E5E5E5] ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="container mx-auto">
          {/* Top Row - Better Mobile Spacing */}
          <div className="flex items-center justify-between py-3 px-4 lg:py-4 lg:px-0">
            {/* Logo - Better Mobile Size */}
            <Link to="/" className="text-xl lg:text-4xl font-bold text-[#6B8E23] flex-shrink-0">
              Rice And Staples
            </Link>

            {/* Search Bar - Hidden on mobile, shown in mobile menu */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search our store"
                  className="w-full rounded-lg border border-[#E5E5E5] px-4 py-2 focus:ring-2 focus:ring-[#6B8E23] focus:outline-none text-[#333333]"
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#696969]" />
              </div>
            </div>

            {/* Right Section - Icons Only - Better Mobile Spacing */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Toggle - Hidden on mobile */}
              <div className="hidden md:flex items-center">
                <div className="flex bg-[#F5F5DC] rounded-full p-1">
                  <button
                    onClick={() => setIsWholesale(false)}
                    className={`px-3 lg:px-4 py-1 lg:py-2 rounded-full transition text-xs lg:text-sm font-medium ${
                      !isWholesale ? "bg-white shadow text-[#6B8E23]" : "text-[#696969]"
                    }`}
                  >
                    Retail
                  </button>
                  <button
                    onClick={() => setIsWholesale(true)}
                    className={`px-3 lg:px-4 py-1 lg:py-2 rounded-full transition text-xs lg:text-sm font-medium ${
                      isWholesale ? "bg-white shadow text-[#6B8E23]" : "text-[#696969]"
                    }`}
                  >
                    Wholesale
                  </button>
                </div>
              </div>

              {/* User Profile / Auth Section - Desktop */}
              <div className="hidden md:flex items-center space-x-4">
                {isLoggedIn ? (
                  // Logged in state - Show user info and logout with better icons
                  <div className="flex items-center space-x-3">
                    <Link 
                      to="/account" 
                      className="flex items-center space-x-2 text-[#333333] hover:text-[#6B8E23] transition-colors group"
                    >
                      <div className="relative">
                        <FaUserCheck className="w-6 h-6 text-[#6B8E23] group-hover:text-[#5A7A1A] transition-colors" />
                      </div>
                      <span className="text-sm font-medium">My Account</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-[#333333] hover:text-[#DC143C] transition-colors p-2 rounded-lg hover:bg-gray-100"
                      title="Logout"
                    >
                      <FaSignOutAlt size={20} />
                    </button>
                  </div>
                ) : (
                  // Not logged in - Show login/signup buttons
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAuthClick("login")}
                      className="flex items-center space-x-2 text-[#333333] hover:text-[#6B8E23] transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <FaUserCircle className="w-4 h-4" />
                      <span>Login</span>
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      onClick={() => handleAuthClick("signup")}
                      className="text-[#333333] hover:text-[#6B8E23] transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist Icon - Better Mobile Size */}
              <Link 
                to="/wishlist" 
                className="relative text-[#333333] hover:text-[#6B8E23] transition-colors"
              >
                <FaRegHeart size={24} className="lg:w-6 lg:h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#DC143C] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button - Better Mobile Size */}
              <button 
                onClick={() => setCartOpen(!cartOpen)}
                className="relative text-[#333333] hover:text-[#6B8E23] transition-colors"
                data-cart-icon="true"
              >
                <FaCartPlus size={24} className="lg:w-6 lg:h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#DC143C] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle - Better Visibility */}
              <button 
                onClick={() => setOpen(!open)}
                className="lg:hidden text-[#333333] p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation with Request Button */}
          <nav className="hidden lg:block border-t border-[#E5E5E5] mt-0">
            <div className="flex justify-between items-center py-3">
              {/* Left Side - Navigation Menu + Request Button */}
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
                        <button className="flex items-center text-[#333333] font-bold hover:text-[#6B8E23] transition-colors text-sm uppercase group">
                          {item.label}
                          <FaChevronDown className={`ml-1 w-3 h-3 transition-transform duration-200 ${collectionDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {collectionDropdown && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white border border-[#E5E5E5] rounded-lg shadow-xl z-50">
                            <div className="p-6">
                              <div className="grid grid-cols-1 gap-4">
                                {collectionItems.map((collection) => (
                                  <Link
                                    key={collection.id}
                                    to={collection.link}
                                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#F5F5DC] transition-all duration-200 group"
                                    onClick={() => setCollectionDropdown(false)}
                                  >
                                    <div className="flex-shrink-0 w-12 h-12 bg-white border border-[#E5E5E5] rounded-lg flex items-center justify-center group-hover:border-[#6B8E23] transition-colors">
                                      <span className="text-2xl">{collection.image}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-bold text-[#333333] text-sm group-hover:text-[#6B8E23] transition-colors">
                                        {collection.title}
                                      </h3>
                                      <p className="text-[#696969] text-xs mt-1">
                                        {collection.description}
                                      </p>
                                    </div>
                                    <svg
                                      className="w-4 h-4 text-[#696969] group-hover:text-[#6B8E23] transition-colors flex-shrink-0"
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
                          `text-[#333333] font-bold hover:text-[#6B8E23] transition-colors text-sm uppercase ${
                            isActive ? "text-[#6B8E23]" : ""
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    )
                  ))}
                </div>

                {/* Request Products Button */}
                <button 
                  onClick={() => navigate("/request-product")}
                  className="flex items-center bg-[#DC143C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C1121F] transition-colors ml-4"
                >
                  Request Products
                </button>
              </div>

              {/* Right Side - Breadcrumb */}
              {location.pathname !== "/" && (
                <div className="text-sm text-[#696969]">
                  <span className="opacity-70">Home</span>
                  <span className="mx-2">/</span>
                  <span className="text-[#333333] capitalize">
                    {location.pathname.split("/")[1]}
                  </span>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Search - Always Visible when menu open */}
          <div className={`lg:hidden px-4 transition-all duration-300 overflow-hidden ${
            open ? "pb-4 border-b border-[#E5E5E5] max-h-20" : "max-h-0"
          }`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search our store..."
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#6B8E23] focus:outline-none text-[#333333]"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#696969]" />
            </div>
          </div>

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

                {/* Toggle - Better Mobile Layout */}
                <div className="flex bg-[#F5F5DC] rounded-2xl p-1">
                  <button
                    onClick={() => setIsWholesale(false)}
                    className={`flex-1 py-3 rounded-xl transition text-sm font-medium ${
                      !isWholesale ? "bg-white shadow text-[#6B8E23]" : "text-[#696969]"
                    }`}
                  >
                    Retail
                  </button>
                  <button
                    onClick={() => setIsWholesale(true)}
                    className={`flex-1 py-3 rounded-xl transition text-sm font-medium ${
                      isWholesale ? "bg-white shadow text-[#6B8E23]" : "text-[#696969]"
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
                  // Not logged in - Mobile
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleAuthClick("login")}
                      className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gray-100 text-[#333333] font-bold hover:bg-[#6B8E23] hover:text-white transition-colors"
                    >
                      <FaUserCircle size={16} />
                      <span className="text-sm">LOGIN</span>
                    </button>
                    <button
                      onClick={() => handleAuthClick("signup")}
                      className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-[#6B8E23] text-white font-bold hover:bg-[#5A7A1A] transition-colors"
                    >
                      <span className="text-sm">SIGN UP</span>
                    </button>
                  </div>
                )}

                {/* Navigation Links - Better Mobile Spacing with Icons */}
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
                      className="flex items-center space-x-4 py-4 px-4 rounded-2xl bg-[#F5F5DC] text-[#333333] font-bold hover:bg-[#6B8E23] hover:text-white transition-colors text-sm group"
                    >
                      <div className="text-[#6B8E23] group-hover:text-white transition-colors">
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
                  className="w-full bg-[#DC143C] text-white py-4 rounded-2xl font-bold hover:bg-[#C1121F] transition-colors text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <span>🚀</span>
                  <span>REQUEST PRODUCTS</span>
                </button>

                {/* Contact Info in Mobile Menu */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-gray-500 flex-shrink-0" size={14} />
                      <span>+2600 0500 2600</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-gray-500 flex-shrink-0" size={14} />
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