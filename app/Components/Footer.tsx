// app/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#fcf6ed] text-[#333333]">
      <div className="container mx-auto py-12 px-4">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our subscribe newsletter</h3>
            <p className="text-[#696969] mb-4">And receive 20% off coupon for first shopping</p>
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l text-[#333333] focus:outline-none border border-[#E5E5E5] bg-white"
              />
              <button className="bg-[#DC143C] hover:bg-[#C1121F] text-white font-bold px-6 py-3 rounded-r transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center">
            <h3 className="text-2xl font-bold mb-4">Mobile app store</h3>
            <p className="text-[#696969] mb-4 text-right">Check promotions, which are available in.</p>
            <div className="flex space-x-4">
              <button className="bg-[#333333] hover:bg-[#1a1a1a] text-white px-6 py-3 rounded transition-colors">
                Google Play
              </button>
              <button className="bg-[#333333] hover:bg-[#1a1a1a] text-white px-6 py-3 rounded transition-colors">
                App Store
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-t border-[#E5E5E5] pt-8">
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#333333]">My account</h4>
            <ul className="space-y-2 text-[#696969]">
              <li><Link to="/account" className="hover:text-[#6B8E23] transition-colors">My account</Link></li>
              <li><Link to="/cart" className="hover:text-[#6B8E23] transition-colors">My cart</Link></li>
              <li><Link to="/orders" className="hover:text-[#6B8E23] transition-colors">Order history</Link></li>
              <li><Link to="/wishlist" className="hover:text-[#6B8E23] transition-colors">My wishlist</Link></li>
              <li><Link to="/address" className="hover:text-[#6B8E23] transition-colors">My address</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#333333]">Services</h4>
            <ul className="space-y-2 text-[#696969]">
              <li><Link to="/about" className="hover:text-[#6B8E23] transition-colors">About vegist</Link></li>
              <li><Link to="/faq" className="hover:text-[#6B8E23] transition-colors">Faq's</Link></li>
              <li><Link to="/contact" className="hover:text-[#6B8E23] transition-colors">Contact us</Link></li>
              <li><Link to="/news" className="hover:text-[#6B8E23] transition-colors">News</Link></li>
              <li><Link to="/locations" className="hover:text-[#6B8E23] transition-colors">Store location</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#333333]">Privacy & terms</h4>
            <ul className="space-y-2 text-[#696969]">
              <li><Link to="/payment" className="hover:text-[#6B8E23] transition-colors">Payment policy</Link></li>
              <li><Link to="/privacy" className="hover:text-[#6B8E23] transition-colors">Privacy policy</Link></li>
              <li><Link to="/return" className="hover:text-[#6B8E23] transition-colors">Return policy</Link></li>
              <li><Link to="/shipping" className="hover:text-[#6B8E23] transition-colors">Shipping policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#6B8E23] transition-colors">Terms & conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#333333]">Top categories</h4>
            <ul className="space-y-2 text-[#696969]">
              <li><Link to="/category/fruits" className="hover:text-[#6B8E23] transition-colors">Fresh fruits</Link></li>
              <li><Link to="/category/wine" className="hover:text-[#6B8E23] transition-colors">Organic wine</Link></li>
              <li><Link to="/category/juice" className="hover:text-[#6B8E23] transition-colors">Organic juice</Link></li>
              <li><Link to="/category/dairy" className="hover:text-[#6B8E23] transition-colors">Dairy & cheese</Link></li>
              <li><Link to="/category/meat" className="hover:text-[#6B8E23] transition-colors">Fresh meat</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#333333]">Follow us</h4>
            <div className="flex space-x-3">
              {["Facebook", "Twitter", "Instagram", "YouTube"].map((social) => (
                <button 
                  key={social} 
                  className="w-8 h-8 bg-[#6B8E23] rounded-full flex items-center justify-center hover:bg-[#5A7A1A] transition-colors"
                >
                  <span className="text-xs font-bold text-white">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#E5E5E5] mt-8 pt-8 text-center text-[#696969]">
          <p>&copy; 2024 Vegist. All rights reserved. Premium grocery store collection of 2024.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;