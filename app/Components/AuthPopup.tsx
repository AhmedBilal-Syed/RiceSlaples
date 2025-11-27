// app/Components/AuthPopup.tsx
import React, { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
  onAuthSuccess?: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose, initialMode = "login", onAuthSuccess }) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Form submitted:", formData);
    
    // Simulate successful authentication
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    
    // Close the popup
    onClose();
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: ""
    });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay without blackout */}
      <div 
        className="absolute inset-0 bg-transparent" 
        onClick={onClose}
      />
      
      {/* Popup Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 opacity-100 border border-gray-200 z-10">
        
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#6B8E23] border-gray-300 rounded focus:ring-[#6B8E23]"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-[#6B8E23] hover:text-[#5A7A1A] font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6B8E23] to-[#5A7A1A] text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Social Login */}
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin("google")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                <FaGoogle className="text-red-500 mr-2" />
                Google
              </button>
              <button
                onClick={() => handleSocialLogin("facebook")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                <FaFacebook className="text-blue-600 mr-2" />
                Facebook
              </button>
            </div>
          </div> */}

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={switchMode}
                className="text-[#6B8E23] hover:text-[#5A7A1A] font-semibold transition-colors"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;