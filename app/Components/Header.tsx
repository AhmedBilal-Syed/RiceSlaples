import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaSearch, FaPhone, FaEnvelope, FaUser, FaCartPlus, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isWholesale, setIsWholesale] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* Top Bar */}
     <div className="bg-[#6B8E23] text-white py-2 px-3 sm:px-4 text-sm">
  <div className="container mx-auto">
    <div className="flex flex-col xs:flex-row justify-between items-center gap-1 xs:gap-4">
      {/* Contact Info */}
      <div className="flex flex-wrap justify-center xs:justify-start gap-3 xs:gap-6">
        <span className="flex items-center space-x-1 xs:space-x-2 text-xs">
          <FaPhone className="text-xs flex-shrink-0" />
          <p className="whitespace-nowrap">+2600 0500 2600</p>
        </span>
        <span className="flex items-center space-x-1 xs:space-x-2 text-xs">
          <FaEnvelope className="text-xs flex-shrink-0" />
          <p className="whitespace-nowrap">Info@gmail.com</p>
        </span>
      </div>
      
      {/* Sale Banner */}
      <p className="font-medium text-xs xs:text-sm text-center xs:text-right whitespace-nowrap mt-1 xs:mt-0">
        Summer sale 50% off
      </p>
    </div>
  </div>
</div>

      {/* Main Header */}
      <header className={`bg-white sticky top-0 z-50 transition-all ${scrolled ? "shadow-md" : ""}`}>
        <div className="container mx-auto py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#6B8E23]">Vegist</Link>

            {/* Search Bar */}
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

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Toggle */}
              <div className="hidden md:flex items-center">
                <div className="flex bg-[#F5F5DC] rounded-full p-1">
                  <button
                    onClick={() => setIsWholesale(false)}
                    className={`px-4 py-2 rounded-full transition text-sm font-medium ${
                      !isWholesale ? "bg-white shadow text-[#6B8E23]" : "text-[#696969]"
                    }`}
                  >
                    Retail
                  </button>
                  <button
                    onClick={() => setIsWholesale(true)}
                    className={`px-4 py-2 rounded-full transition text-sm font-medium ${
                      isWholesale ? "bg-white shadow text-[#6B8E23]" : "text-[#696969]"
                    }`}
                  >
                    Wholesale
                  </button>
                </div>
              </div>

              {/* Request Button */}
              <button className="hidden md:flex items-center bg-[#DC143C] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C1121F] transition-colors">
                Request Products
              </button>

              {/* User */}
              <Link to="/account" className="hidden md:flex text-[#333333] hover:text-[#6B8E23] transition-colors">
                <FaUser size={20} />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative text-[#333333] hover:text-[#6B8E23] transition-colors">
                <FaCartPlus size={22} />
                <span className="absolute -top-2 -right-2 bg-[#DC143C] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">3</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setOpen(!open)} className="lg:hidden text-[#333333]">
                {open ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block border-t border-[#E5E5E5] mt-3">
            <div className="flex justify-between items-center py-3">
              {/* Menu Items */}
              <div className="flex items-center space-x-8">
                {[
                  { path: "/", label: "HOME" },
                  { path: "/products", label: "SHOP" },
                  { path: "/categories", label: "COLLECTION" },
                  { path: "/pages", label: "PAGES" },
                  { path: "/blogs", label: "BLOGS" },
                  { path: "/buy", label: "BUY VEGIST" }
                ].map(item => (
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
                ))}
              </div>

              {/* Breadcrumb */}
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

          {/* Mobile Search */}
          <div className="lg:hidden px-4 pb-4 border-b border-[#E5E5E5] mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our store"
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6B8E23] focus:outline-none text-[#333333]"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#696969]" />
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="lg:hidden bg-white border-t border-[#E5E5E5] shadow-md">
              <div className="container mx-auto py-4 px-4 space-y-4">
                {/* Toggle */}
                <div className="flex bg-[#F5F5DC] rounded-full p-1">
                  <button
                    onClick={() => setIsWholesale(false)}
                    className={`flex-1 py-2 rounded-full transition text-sm font-medium ${
                      !isWholesale ? "bg-white shadow text-[#6B8E23]" : "text-[#696969]"
                    }`}
                  >
                    Retail
                  </button>
                  <button
                    onClick={() => setIsWholesale(true)}
                    className={`flex-1 py-2 rounded-full transition text-sm font-medium ${
                      isWholesale ? "bg-white shadow text-[#6B8E23]" : "text-[#696969]"
                    }`}
                  >
                    Wholesale
                  </button>
                </div>

                {/* Links */}
                <div className="space-y-2">
                  {[
                    { path: "/", label: "HOME" },
                    { path: "/products", label: "SHOP" },
                    { path: "/categories", label: "COLLECTION" },
                    { path: "/pages", label: "PAGES" },
                    { path: "/blogs", label: "BLOGS" },
                    { path: "/buy", label: "BUY VEGIST" },
                    { path: "/account", label: "ACCOUNT" },
                    { path: "/cart", label: "CART" }
                  ].map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="block py-3 px-4 rounded-lg bg-[#F5F5DC] text-[#333333] font-bold hover:bg-[#6B8E23] hover:text-white transition-colors text-sm uppercase"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Request Button */}
                <button className="w-full bg-[#DC143C] text-white py-3 rounded-lg font-bold hover:bg-[#C1121F] transition-colors text-sm">
                  REQUEST PRODUCTS
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;